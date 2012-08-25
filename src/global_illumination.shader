
/*
    Conclusion of is that the shader is fillrate bound, not lookup bound

    42 fps without GI
    42 fps when discarding in VS
    21 fps with unified geometry
    21 fps with early z and discard
    21 fps with early z and gl_FragColor write
    21 fps when discarding in FS
    17 fps with GI
    17 fps without discard
    17 fps without light lookup
    13 fps without conditional/discard
*/

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

        /* // gives some speed, difficult to get rid of artifacts, very uneven performance
        vec4 center_view = view * vec4(lightprobe.xyz+center, 1.0);
        vec4 center_proj = proj * center_view;
        clip = center_proj.xy/center_proj.w;
        float scene_depth = texture2D(normaldepth, clip*0.5+0.5).w;
        float center_depth = length(center_view.xyz);
        float dist = distance(normalize(center_view.xyz) * scene_depth, (view * vec4(lightprobe.xyz, 1.0)).xyz);
        if(abs(clip.x) < 1.0 && abs(clip.y) < 1.0 && dist < 5.0){

            gl_Position = proj * view * vec4(pos, 1.0);
        }
        else{
            gl_Position = vec4(2.0);
        }
        */
    }

fragment:
    #require harmonics

    uniform mat4 inv_view;
    uniform vec2 viewport;
    uniform float gi_gain;
    //uniform float index;
   
    void main(){
        vec4 data = texture2D(normaldepth, gl_FragCoord.xy/viewport);
        vec3 normal = data.xyz;
        float depth = data.w;
        vec3 eye_pos = depth * normalize(vViewPosition);
        vec3 position = (inv_view * vec4(eye_pos, 1.0)).xyz;

        // apply the global illumination
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
