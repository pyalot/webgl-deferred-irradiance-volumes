vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform sampler2D normaldepth;
    uniform vec2 viewport;
    uniform float range;
        
    void main(){
        vec4 data = texture2D(normaldepth, gl_FragCoord.xy/viewport);
        float depth = data.w;
        float scaled = clamp(depth/range, 0.0, 1.0);
        gl_FragColor = vec4(scaled, scaled*scaled, 0.0, 1.0);
        //float dx = dFdx(scaled);
        //float dy = dFdy(scaled);
        //gl_FragColor = vec4(scaled, scaled*scaled + 0.25*(dx*dx + dy*dy), 0.0, 1.0);
    }
        
