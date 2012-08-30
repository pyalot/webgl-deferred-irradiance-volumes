varying vec3 vNormal;
uniform mat4 proj, view;

vertex:
    attribute vec3 position, normal;

    void main(){
        vNormal = normal;
        gl_Position = proj * view * vec4(position, 1.0);
    }

fragment:
    void main(){
        gl_FragColor = vec4(normalize(vNormal), 1.0);
    }
