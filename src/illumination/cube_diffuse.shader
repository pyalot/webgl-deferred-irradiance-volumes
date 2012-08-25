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
    uniform sampler2D diffuse_texture;
    uniform vec3 diffuse_color;
    void main(){
        vec3 diffuse = pow(texture2D(diffuse_texture, vTexcoord).rgb, vec3(1.8));
        gl_FragColor = vec4(diffuse*pow(diffuse_color, vec3(1.8)), 1.0);
    }
