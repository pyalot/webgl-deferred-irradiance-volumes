vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform sampler2D global, direct, albedo, debug, ssao;
    uniform vec2 viewport;
    uniform float gamma, brightness, saturation;
    uniform float probe_factor, di_factor, gi_factor, ao_factor;
    uniform vec3 sky_radiance, sun_radiance;

    void main(){
        float occlusion = mix(1.0, texture2D(ssao, gl_FragCoord.xy/viewport).r, ao_factor);

        vec4 global_data = texture2D(global, gl_FragCoord.xy/viewport);
        vec3 global_irradiance = max(global_data.rgb/global_data.a, vec3(0.0));

        vec3 direct_irradiance = texture2D(direct, gl_FragCoord.xy/viewport).rgb * sun_radiance;
        vec4 diffuse_color = texture2D(albedo, gl_FragCoord.xy/viewport);

        vec3 irradiance = (global_irradiance*gi_factor + direct_irradiance*di_factor)*occlusion;
        vec3 excident = mix(sky_radiance, diffuse_color.rgb*irradiance, diffuse_color.a);
        
        vec4 debug_data = texture2D(debug, gl_FragCoord.xy/viewport);
        vec3 color = mix(excident, debug_data.rgb, debug_data.a*probe_factor);

        color = brightness * color;

        vec3 luma_coeff = vec3(0.2125, 0.7154, 0.0721);
        vec3 intensity = vec3(dot(color, luma_coeff));
        color = mix(intensity, color, saturation);
        
        gl_FragColor = vec4(clamp(pow(color, vec3(1.0/gamma)), vec3(0.0), vec3(1.0)), 1.0);
    }
