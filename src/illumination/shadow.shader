varying vec2 vTexcoord;
varying vec3 vPosition, vNormal;
varying vec3 vViewPosition;

vertex:
    attribute vec3 position, normal;
    attribute vec2 texcoord;

    void main(){
        vTexcoord = texcoord;
        vPosition = position;
        vNormal = normal;
        gl_Position = vec4(texcoord*2.0-1.0, 0.0, 1.0);
    }

fragment:
    uniform mat4 shadow_view, shadow_proj;
    uniform mat3 shadow_rot;
    uniform sampler2D depth;
    
    void main(){
        vec3 normal = normalize(vNormal);
        
        vec4 shadow_view = shadow_view * vec4(vPosition, 1.0);
        vec4 shadow_device = shadow_proj * shadow_view;
        vec2 shadow_coord = (shadow_device.xy/shadow_device.w)*0.5+0.5;

        float occlusion = 0.0;

        for(int u=-2; u<=2; u++){
            for(int v=-2; v<=2; v++){
                vec4 shadow_value = texture2D(depth, shadow_coord+vec2(u,v)/2048.0);
                float shadow_depth = shadow_value.w;
                vec3 shadow_normal = normalize(shadow_value.xyz);
                float diff = shadow_view.z - shadow_value.w;
                float shadowed = smoothstep(-0.04, -0.02, diff);
                occlusion += shadowed;
            }
        }
        occlusion /= 25.0;
        //float lambert = step(0.01, (shadow_rot * normal).z);
        float lambert = clamp((shadow_rot * normal).z, 0.0, 1.0);
        float intensity = min(occlusion, lambert);
        //float intensity = occlusion*lambert;
        vec3 color = intensity * vec3(1.0, 0.95, 1.0);
        gl_FragColor = vec4(color, 1.0);
    }
