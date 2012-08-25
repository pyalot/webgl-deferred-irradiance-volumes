vertex:
    attribute vec2 position;

    void main(){
        gl_Position = vec4(position, 0.0, 1.0);
    }

fragment:
    #define FXAA_WebGL 1
    //#require fxaa3_11
    //#require fxaa3_11_stripped
    #require fxaa3_11_preprocessed

    uniform sampler2D source;
    uniform vec2 viewport;
    uniform float subpixel_aa, contrast_treshold, edge_treshold;

    void main(){
        vec4 color = FxaaPixelShader(
            gl_FragCoord.xy/viewport,
            source,
            vec2(1.0)/viewport,
            subpixel_aa,
            contrast_treshold,
            edge_treshold 
        );
        gl_FragColor = vec4(color.rgb, 1.0);
    }

