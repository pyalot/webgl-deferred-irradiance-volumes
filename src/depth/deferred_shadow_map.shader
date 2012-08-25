varying vec2 clip;

vertex:
    attribute vec2 position;

    void main(){
        clip = position;
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    #require variance
    uniform sampler2D eye_normaldepth;
    uniform mat4 inv_eye_proj, inv_eye_view;
    uniform vec2 viewport;
   
    void main(){
        vec4 eye_data = texture2D(eye_normaldepth, gl_FragCoord.xy/viewport);
        vec3 normal = eye_data.xyz;
        float depth = eye_data.w;
        vec4 device_pos = inv_eye_proj * vec4(clip, 1.0, 1.0);
        vec3 eye_normal = normalize(device_pos.xyz);
        vec3 eye_pos = depth * eye_normal;
        vec3 position = (inv_eye_view * vec4(eye_pos, 1.0)).xyz;

        gl_FragColor = vec4(vec3(getIntensity(position, normal)), 1.0);
    }
