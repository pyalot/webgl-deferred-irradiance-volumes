varying vec2 vTexcoord;
varying vec3 vPosition;
uniform mat4 proj, view;

vertex:
    attribute vec3 position;
    attribute vec2 texcoord;

    void main(){
        vTexcoord = texcoord;
        vPosition = position;
        gl_Position = proj * view * vec4(position, 1.0);
    }

fragment:
    void main(){
        gl_FragColor = vec4(vTexcoord, 0.0, 1.0);
    }
