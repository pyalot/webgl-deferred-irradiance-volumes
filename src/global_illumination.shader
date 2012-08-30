varying vec3 vViewPosition;
varying vec4 vLightprobe;
uniform mat4 proj, view;
uniform sampler2D normaldepth;

vertex:
    attribute vec3 position, center;
    attribute vec4 lightprobe;
    
    void main(){
        vec3 pos = lightprobe.xyz + position;
        vViewPosition = (view * vec4(pos, 1.0)).xyz;
        vLightprobe = lightprobe;

        gl_Position = proj * view * vec4(pos, 1.0);
    }

fragment:
    #require harmonics

    uniform mat4 inv_view;
    uniform vec2 viewport;
    uniform float gi_gain;
   
    void main(){
        vec4 data = texture2D(normaldepth, gl_FragCoord.xy/viewport);
        vec3 normal = data.xyz;
        float depth = data.w;
        vec3 eye_pos = depth * normalize(vViewPosition);
        vec3 position = (inv_view * vec4(eye_pos, 1.0)).xyz;

        float dist = distance(vLightprobe.xyz, position);
        float lambert = dot(normal, normalize(vLightprobe.xyz-position));
        if(dist < 5.0 && lambert > 0.0){
            float falloff = 1.0 - clamp(dist/5.0, 0.0, 1.0);
            float intensity = clamp(pow(falloff, 1.5) * lambert, 0.0, 1.0);
            vec3 irradiance = sphericalHarmonics(vLightprobe.w, normal)*gi_gain;
            gl_FragColor = vec4(irradiance * intensity, intensity);
        }
        else{
            discard;
        }
    }
