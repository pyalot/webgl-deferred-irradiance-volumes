vsub = (p1, p2) ->
    return [
        p1[0] - p2[0],
        p1[1] - p2[1],
        p1[2] - p2[2],
    ]

vadd = (p1, p2) ->
    return [
        p1[0] + p2[0],
        p1[1] + p2[1],
        p1[2] + p2[2],
    ]

sadd = (s, p) ->
    x=p[0]; y=p[1]; z=p[2]
    return [x+s, y+s, z+s]

slength = (p) ->
    x=p[0]; y=p[1]; z=p[2]
    return x*x + y*y + z*z

length = (p) ->
    return Math.sqrt(slength(p))

dot = (p1, p2) ->
    x1=p1[0]; y1=p1[1]; z1=p1[2]
    x2=p2[0]; y2=p2[1]; z2=p2[2]
    return x1*x2 + y1*y2 + z1*z2

smul = (s, p) ->
    x=p[0]; y=p[1]; z=p[2]
    return [x*s, y*s, z*s]

cross = (p1, p2) ->
    x1=p1[0]; y1=p1[1]; z1=p1[2]
    x2=p2[0]; y2=p2[1]; z2=p2[2]
    
    return [
        y1*z2 - z1*y2,
        z1*x2 - x1*z2,
        x1*y2 - y1*x2,
    ]

exports.closestPointTriangle = (p, a, b, c) ->
    ab = vsub(b, a)
    ac = vsub(c, a)
    bc = vsub(c, b)

    snom = dot(vsub(p,a), ab); sdenom = dot(vsub(p,b), vsub(a,b))
    tnom = dot(vsub(p, a), ac); tdenom = dot(vsub(p,c), vsub(a,c))
    if snom <= 0 and tnom <= 0 then return a

    unom = dot(vsub(p,b), bc); udenom = dot(vsub(p,c), vsub(b,c))
    if sdenom <= 0 and unom <= 0 then return b
    if tdenom <= 0 and udenom <= 0 then return c

    n = cross(vsub(b,a), vsub(c,a))
    vc = dot(n, cross(vsub(a,p), vsub(b,p)))
    if vc <= 0 and snom >= 0 and sdenom >= 0
        return vadd(a, smul(snom/(snom + sdenom), ab))

    va = dot(n, cross(vsub(b,p), vsub(c,p)))
    if va <= 0 and unom >= 0 and udenom >= 0
        return vadd(b, smul(unom/(unom + udenom), bc))

    vb = dot(n, cross(vsub(c,p), vsub(a,p)))
    if vb <= 0 and tnom > 0 and tdenom >= 0
        return vadd(a, smul(tnom/(tnom + tdenom), ac))

    u = va/(va+vb+vc)
    v = vb/(va+vb+vc)
    w = 1-u-v
    return vadd(smul(u, a), vadd(smul(v,b), smul(w,c)))

exports.pointTriangleDist = (p, v0, v1, v2) ->
    [cx, cy, cz] = exports.closestPointTriangle(p, v0, v1, v2)
    [px, py, pz] = p
    dx=cx-px; dy=cy-py; dz=cz-pz
    return Math.sqrt(dx*dx + dy*dy + dz*dz)
