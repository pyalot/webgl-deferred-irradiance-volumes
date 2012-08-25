varying vec2 clip;

vertex:
    attribute vec2 position;

    void main(){
        clip = position;
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform sampler2D sun_normaldepth, eye_normaldepth;
    uniform float eye_near, eye_far, sun_near, sun_far;
    uniform mat4 inv_eye_proj, inv_eye_view, sun_view, sun_proj;
    uniform mat3 sun_rot, inv_eye_rot;
    uniform vec2 sun_normaldepth_size;
    uniform vec2 viewport;
    uniform float epsilon, shadow_bias, shadow_distance;
   
    vec2 getMoments(vec2 uv, float x, float y){
        vec4 sun_data = texture2D(sun_normaldepth, uv + vec2(x,y)/sun_normaldepth_size);
        return sun_data.rg;
    }
    float linstep(float low, float high, float v){
        return clamp((v-low)/(high-low), 0.0, 1.0);
    }

    float occlusionFun(vec2 moments, float z){
        float p = smoothstep(z-0.02, z-0.01, moments.x);
        float variance = moments.y - moments.x*moments.x;
        float d = z - moments.x;
        float p_max = variance/(variance+d*d);
        //p_max = linstep(0.4, 1.0, p_max);
        p_max = smoothstep(0.4, 1.0, p_max);
        return max(p, p_max);
    }

    float getOcclusion(vec2 uv, float z, float x, float y){
        vec2 moments = getMoments(uv, x, y);
        return occlusionFun(moments, z);
    }

    void main(){
        vec4 eye_data = texture2D(eye_normaldepth, gl_FragCoord.xy/viewport);
        vec3 normal = eye_data.xyz;
        float depth = eye_data.w;
        vec4 device_pos = inv_eye_proj * vec4(clip, 1.0, 1.0);
        vec3 eye_normal = normalize(device_pos.xyz);
        vec3 eye_pos = depth * eye_normal;
        vec3 position = (inv_eye_view * vec4(eye_pos, 1.0)).xyz;

        vec4 sun_view_position = sun_view * vec4(position, 1.0);
        vec4 sun_device = sun_proj * sun_view_position;
        vec2 sun_clip = sun_device.xy/sun_device.w;
        vec2 uv = sun_clip*0.5+0.5;
        float z = -sun_view_position.z/42.0;

        //float occlusion = getOcclusion(uv, z, 0.0, 0.0);
        float occlusion = getOcclusion(uv, z, 0.0, 0.0);
        float lambert = clamp((sun_rot * normal).z, 0.0, 1.0);
        //float intensity = clamp(min(occlusion, lambert), 0.0, 1.0);
        float intensity = occlusion * lambert;
        //float intensity = (1.0 - occlusion)*lambert;
        vec3 color = intensity * vec3(1.0, 0.95, 1.0);
        gl_FragColor = vec4(color, 1.0);
        //gl_FragColor = vec4(vec3(occlusion), 1.0);
    }
