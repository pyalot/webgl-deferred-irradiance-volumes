vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    uniform sampler2D normaldepth, momentsmap;
    uniform vec2 viewport;
    uniform float range;

    float linstep(float low, float high, float v){
        return clamp((v-low)/(high-low), 0.0, 1.0);
    }

    float getOcclusion(float depth, vec2 moments, float offset){
        float p = smoothstep(depth-offset/range, depth, moments.x);
        //float p = step(depth-offset/range, moments.x);
        float variance = moments.y - moments.x*moments.x;
        float d = depth - moments.x;
        float p_max = variance/(variance+d*d);
        p_max = smoothstep(0.5, 1.0, p_max);
        return 1.0-clamp(max(p, p_max), 0.0, 1.0);
    }
        
    void main(){
        float depth = clamp(texture2D(normaldepth, gl_FragCoord.xy/viewport).w/range, 0.0, 1.0);
        vec2 moments = texture2D(momentsmap, gl_FragCoord.xy/viewport).xy;
        float factor = smoothstep((depth-0.2/range), depth, moments.x);
        float result = getOcclusion(depth, moments, 0.025)*clamp(factor, 0.0, 1.0);
        gl_FragColor = vec4(1.0-pow(result, 0.5));
    }
