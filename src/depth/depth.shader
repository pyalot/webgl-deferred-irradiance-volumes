varying vec3 vViewPosition;
uniform mat4 proj, view;

vertex:
    attribute vec3 position;

    void main(){
        vViewPosition = (view * vec4(position, 1.0)).xyz;
        gl_Position = proj * view * vec4(position, 1.0);
    }

fragment:
    #extension GL_OES_standard_derivatives : enable
    uniform float range;

    void main(){
        float z = -vViewPosition.z/range;
        float dx = dFdx(z);
        float dy = dFdy(z);
        gl_FragColor = vec4(z, z*z + 0.25*(dx*dx + dy*dy), 0.0, 1.0);
    }
