vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform sampler2D global, direct, albedo, probes_normal;
    uniform vec2 viewport;
    uniform vec3 sky_radiance, sun_radiance;

    void main(){
        vec2 coord = gl_FragCoord.xy/viewport;

        float filled = texture2D(probes_normal, coord).a;

        vec4 global_data = texture2D(global, coord);
        vec3 global_irradiance = max(global_data.rgb/global_data.a, vec3(0.0));

        vec3 direct_irradiance = texture2D(direct, coord).rgb * sun_radiance;
        vec3 diffuse_color = texture2D(albedo, coord).rgb;

        vec3 irradiance = global_irradiance + direct_irradiance;
        vec3 excident = mix(sky_radiance, diffuse_color*irradiance, filled);
        
        gl_FragColor = vec4(excident, 1.0);
    }
