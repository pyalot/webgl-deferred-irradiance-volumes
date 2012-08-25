varying vec2 vTexcoord;
varying vec3 vPosition, vViewPosition, vNormal;
uniform mat4 proj, view;
uniform mat3 view_rot;

vertex:
    attribute vec3 position, normal;
    attribute vec2 texcoord;

    void main(){
        vTexcoord = texcoord;
        vPosition = position;
        vNormal = normal;
        vViewPosition = (view * vec4(position, 1.0)).xyz;

        gl_Position = proj * view * vec4(position, 1.0);
    }

fragment:
    uniform sampler2D diffuse_texture;
    uniform float specularity;
    uniform vec3 diffuse_color;
    uniform float gamma;
    void main(){
        vec3 diffuse = pow(texture2D(diffuse_texture, vTexcoord).rgb, vec3(gamma));
        gl_FragColor = vec4(diffuse*pow(diffuse_color, vec3(gamma)), 1.0);
    }
