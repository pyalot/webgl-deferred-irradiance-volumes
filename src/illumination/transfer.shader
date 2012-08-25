vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform sampler2D lightmap, bounce, texmap, diffusemap;
    uniform vec2 viewport;
    uniform vec3 sun_radiance, sky_radiance;

    vec3 get(float x, float y){
        vec2 coord = (gl_FragCoord.xy+vec2(x,y))/viewport;
        vec3 uv = texture2D(texmap, coord).xyz;
        if(uv.b > 0.0){
            return sky_radiance;
        }
        else{
            vec3 diffuse_color = texture2D(diffusemap, coord).rgb;
            vec4 bounce_data = texture2D(bounce, uv.xy);
            vec3 direct_irradiance = texture2D(lightmap, uv.xy).rgb*sun_radiance;
            vec3 global_irradiance = bounce_data.rgb/bounce_data.a;
            return diffuse_color * (direct_irradiance + global_irradiance);
        }
    }
    void main(){
        vec3 result = (
            get(-0.5, -0.5) +
            get(0.5, 0.5) +
            get(-0.5, 0.5) +
            get(0.5, -0.5)
        )/4.0;
        gl_FragColor = vec4(max(result, vec3(0.0)), 1.0);
    }
        
