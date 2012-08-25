varying vec2 vTexcoord, vPosition;

vertex:
    attribute vec2 position;
    uniform vec2 size;
    uniform vec2 offset;

    void main(){
        vPosition = position;
        vTexcoord = position * 0.5 + 0.5;
        gl_Position = vec4(position*size+offset, 0.0, 1.0);
    }

fragment:
    #extension GL_OES_standard_derivatives : enable
    uniform sampler2D source;
    uniform float diva, gamma, mixgamma, border_factor;
    uniform vec2 affine;
    
    float edgeFactor(vec2 src){
        vec2 d = fwidth(src);
        vec2 a3 = smoothstep(vec2(0.0), d*1.5, src);
        return min(a3.x, a3.y);
    }
        
    void main(){
        vec4 data = texture2D(source, vTexcoord);
        vec3 transformed = data.rgb*affine.x + affine.y;
        vec3 color;
        if(data.a == 0.0){
            color = transformed;
        }
        else{
            color = mix(transformed, data.rgb/data.a, diva);
        }
        vec3 corrected = pow(color, vec3(1.0/gamma));
        vec3 output_color = mix(color, corrected, mixgamma);
        vec3 clamped = clamp(output_color, vec3(0.0), vec3(1.0));

        vec2 dpos = fwidth(vPosition);
        vec2 pos = smoothstep(1.0-dpos*4.0, vec2(1.0), abs(vPosition));
        float near = border_factor * max(pos.x, pos.y);
        gl_FragColor = vec4(mix(clamped, vec3(1.0, 0.5, 0.0), near), 1.0);
    }
