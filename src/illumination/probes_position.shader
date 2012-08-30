varying vec3 vPosition;
uniform mat4 proj, view;

vertex:
    attribute vec3 position;

    void main(){
        vPosition = position;
        gl_Position = proj * view * vec4(position, 1.0);
    }

fragment:
    void main(){
        gl_FragColor = vec4(vPosition, 1.0);
    }
