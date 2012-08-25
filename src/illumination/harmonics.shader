vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform sampler2D lightprobes;
    uniform vec2 lightprobes_size;
    uniform float shconst[5];
    
    float pi = 3.141592653589793;
    
    mat3 front = mat3(
         1.0,  0.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  0.0,  1.0
    );
    
    mat3 back = mat3(
        -1.0,  0.0,  0.0,
         0.0,  1.0,  0.0,
         0.0,  0.0, -1.0
    );
    
    mat3 left = mat3(
         0.0,  0.0, -1.0,
         0.0,  1.0,  0.0,
         1.0,  0.0,  0.0
    );
    
    mat3 right = mat3(
         0.0,  0.0,  1.0,
         0.0,  1.0,  0.0,
        -1.0,  0.0,  0.0
    );
    
    mat3 up = mat3(
         1.0,  0.0,  0.0,
         0.0,  0.0,  1.0,
         0.0, -1.0,  0.0
    );
    
    mat3 down = mat3(
         1.0,  0.0,  0.0,
         0.0,  0.0, -1.0,
         0.0,  1.0,  0.0
    );

    float harmonics(vec3 normal){
        int index = int(gl_FragCoord.x);

        float x = normal.x;
        float y = normal.y;
        float z = normal.z;
      
        /*
        if(index==0){
            return shconst[0];
        }
        else if(index==1){
            return shconst[1] * y;
        }
        else if(index==2){
            return shconst[1] * z;
        }
        else if(index==3){
            return shconst[1] * x;
        }
        else if(index==4){
            return shconst[2]*x*y;
        }
        else if(index==5){
            return shconst[2]*y*z;
        }
        else if(index==6){
            return shconst[3] * (3.0*z*z - 1.0);
        }
        else if(index==7){
            return shconst[2]*x*z;
        }
        else{
            return shconst[4]*(x*x - y*y);
        }
        */
        if(index==0){
            return 1.0;
        }
        else if(index==1){
            return y;
        }
        else if(index==2){
            return z;
        }
        else if(index==3){
            return x;
        }
        else if(index==4){
            return x*y;
        }
        else if(index==5){
            return y*z;
        }
        else if(index==6){
            return 3.0*z*z - 1.0;
        }
        else if(index==7){
            return x*z;
        }
        else{
            return x*x - y*y;
        }
    }

    #define probe_size 16

    vec3 sampleSide(float side, mat3 rot){
        vec3 result = vec3(0.0);

        float divider = 0.0;
        //(140,6): error X3511: unable to unroll loop, loop does not appear to terminate in a timely manner (9 iterations), use the [unroll(n)] attribute to force an exact higher number
        /*
        for(int y=0; y<probe_size; y++){
            for(int x=0; x<probe_size; x++){
                vec2 texcoord = (vec2(float(x)+side*16.0, float(y)+floor(gl_FragCoord.y)*16.0)+0.5)/lightprobes_size;
                vec2 sidecoord = ((vec2(x,y)+vec2(0.5, 0.5))/vec2(probe_size))*2.0-1.0;
                vec3 normal = normalize(vec3(sidecoord, -1.0));
                vec3 texel = texture2D(lightprobes, texcoord).rgb;
                result += harmonics(rot*normal) * texel * -normal.z;
                divider += -normal.z;
            }
        }
        */
        for(int i=0; i<256; i++){
            float x = mod(float(i), 16.0);
            float y = float(i/16);
            vec2 texcoord = (vec2(x+side*16.0, y+floor(gl_FragCoord.y)*16.0)+0.5)/lightprobes_size;
            vec2 sidecoord = ((vec2(x,y)+vec2(0.5, 0.5))/vec2(16.0))*2.0-1.0;
            vec3 normal = normalize(vec3(sidecoord, -1.0));
            vec3 texel = texture2D(lightprobes, texcoord).rgb;
            result += harmonics(rot*normal) * texel * -normal.z;
            divider += -normal.z;
        }
        return result / divider;
    }
    
    void main(){
        vec3 result = (
            sampleSide(0.0, front) +
            sampleSide(1.0, back) +
            sampleSide(2.0, left) +
            sampleSide(3.0, right) +
            sampleSide(4.0, up) +
            sampleSide(5.0, down)
        )/6.0;
        gl_FragColor = vec4(result, 1.0);
    }
