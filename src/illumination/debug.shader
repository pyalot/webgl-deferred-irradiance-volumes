varying vec3 vPosition, vViewPosition;
uniform mat4 proj, view;

vertex:
    attribute vec3 position;
    uniform vec3 offset;

    void main(){
        vPosition = position;
        vViewPosition = (view * vec4(position+offset, 1.0)).xyz;
        gl_Position = proj * view * vec4(position+offset, 1.0);
    }

fragment:
    #require /harmonics
    uniform sampler2D normaldepth;
    uniform vec2 viewport;
    uniform float gi_gain;
    uniform float index;
    
    void main(){
        vec4 data = texture2D(normaldepth, gl_FragCoord.xy/viewport);
        float depth = data.w;
        if(length(vViewPosition) < depth){
            gl_FragColor = vec4(sphericalHarmonics(index, normalize(vPosition))*gi_gain, 1.0);
        }
        else{
            discard;
        }
    }
