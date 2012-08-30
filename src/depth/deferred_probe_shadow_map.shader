vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    #require variance
    uniform sampler2D probes_normal, probes_position;
    uniform vec2 viewport;
   
    void main(){
        vec3 normal = texture2D(probes_normal, gl_FragCoord.xy/viewport).xyz;
        vec3 position = texture2D(probes_position, gl_FragCoord.xy/viewport).xyz;
        gl_FragColor = vec4(vec3(getIntensity(position, normal)), 1.0);
    }
