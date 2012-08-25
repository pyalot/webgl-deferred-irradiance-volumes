vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform sampler2D source;
    uniform vec2 viewport;
        
    void main(){
        vec4 sum = vec4(0.0);
        float divider = 0.0;
        for(float x=-2.0; x<=2.0; x++){
            for(float y=-2.0; y<=2.0; y++){
                vec2 coord = vec2(x,y);
                float l = length(coord)+1.0;
                float factor = 1.0/l;
                divider += factor;
                sum += texture2D(source, (gl_FragCoord.xy+vec2(x,y))/viewport) * factor;
            }
        }
        gl_FragColor = sum/divider;
    }
