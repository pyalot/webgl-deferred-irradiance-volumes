vertex:
    attribute vec2 position;
    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform vec4 clear_color;
    void main(){
        gl_FragColor = clear_color;
    }
