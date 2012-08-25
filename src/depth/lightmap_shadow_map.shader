varying vec3 vPosition, vNormal;

vertex:
    attribute vec3 position, normal;
    attribute vec2 texcoord;

    void main(){
        vPosition = position;
        vNormal = normal;
        gl_Position = vec4(texcoord*2.0-1.0, 0.0, 1.0);
    }

fragment:
    #require variance
    
    void main(){
        gl_FragColor = vec4(vec3(getIntensity(vPosition, normalize(vNormal))), 1.0);
    }
