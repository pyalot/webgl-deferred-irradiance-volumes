varying vec2 vTexcoord;
varying vec3 vPosition, vViewPosition, vNormal, vViewNormal;
uniform mat4 proj, view;
uniform mat3 view_rot;

vertex:
    attribute vec3 position, normal;
    attribute vec2 texcoord;

    void main(){
        vTexcoord = texcoord;
        vPosition = position;
        vNormal = normal;
        vViewNormal = view_rot * normal;
        vViewPosition = (view * vec4(position, 1.0)).xyz;

        gl_Position = proj * view * vec4(position, 1.0);
    }

fragment:
    #extension GL_OES_standard_derivatives : enable
    uniform sampler2D bumpmap;

    vec3 perturbedNormal(vec3 normal, float bumpheight){
        vec3 vSigmaS = dFdx(vPosition);
        vec3 vSigmaT = dFdy(vPosition);
        vec3 vR1 = cross(vSigmaT, normal);
        vec3 vR2 = cross(normal, vSigmaS);
        float fDet = dot(vSigmaS, vR1);
        float dBs = dFdx(bumpheight);
        float dBt = dFdy(bumpheight);
        vec3 vSurfGrad = sign(fDet) * (dBs*vR1 + dBt*vR2);
        return normalize(abs(fDet)*normal-vSurfGrad);
    }

    void main(){
        vec3 normal = normalize(vNormal);
        float bumpheight = texture2D(bumpmap, vTexcoord).r;
        vec3 perturbed_normal = perturbedNormal(normal, bumpheight/96.0);
        vec3 eye_dir = normalize(vViewPosition);
        float displacement = dot(eye_dir, -(view_rot*normal)) * bumpheight*0.05;

        //gl_FragColor = vec4(perturbed_normal, length(vViewPosition)-displacement);
        gl_FragColor = vec4(normal, length(vViewPosition));
    }
