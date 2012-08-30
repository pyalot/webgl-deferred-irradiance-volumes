vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    #require /harmonics

    uniform sampler2D probes_normal, probes_position;
    uniform vec2 viewport;
    uniform float gi_gain;
    uniform vec4 lightprobe;
   
    void main(){
        vec3 normal = texture2D(probes_normal, gl_FragCoord.xy/viewport).xyz;
        vec3 position = texture2D(probes_position, gl_FragCoord.xy/viewport).xyz;

        float dist = distance(lightprobe.xyz, position);
        float lambert = dot(normal, normalize(lightprobe.xyz-position));
        if(dist < 5.0 && lambert > 0.0){
            float falloff = 1.0 - clamp(dist/5.0, 0.0, 1.0);
            float intensity = clamp(pow(falloff, 1.5) * lambert, 0.0, 1.0);
            vec3 irradiance = sphericalHarmonics(lightprobe.w, normal)*gi_gain;
            gl_FragColor = vec4(irradiance * intensity, intensity);
        }
        else{
            discard;
        }
    }
