varying vec3 vPosition, vNormal;
varying vec4 vLightprobe;

vertex:
    attribute vec3 position, normal;
    attribute vec2 texcoord;
    attribute vec4 lightprobe;

    void main(){
        vPosition = position;
        vNormal = normal;
        vLightprobe = lightprobe;
        gl_Position = vec4(texcoord*2.0-1.0, 0.0, 1.0);
    }

fragment:
    #require /harmonics
    uniform vec2 viewport;
    uniform float gi_gain;
    
    void main(){
        // compute world normal
        vec3 normal = normalize(vNormal);

        // apply the global illumination
        float dist = distance(vLightprobe.xyz, vPosition);
        float lambert = dot(normal, normalize(vLightprobe.xyz-vPosition));
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
