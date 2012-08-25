// Geometric Tools, LLC
// Copyright (c) 1998-2012
// Distributed under the Boost Software License, Version 1.0.
// http://www.boost.org/LICENSE_1_0.txt
// http://www.geometrictools.com/License/Boost/LICENSE_1_0.txt
//
// File Version: 5.0.1 (2010/10/01)

#include "Wm5MathematicsPCH.h"
#include "Wm5DistPoint3Triangle3.h"

namespace Wm5
{
//----------------------------------------------------------------------------
template <typename Real>
DistPoint3Triangle3<Real>::DistPoint3Triangle3 (const Vector3<Real>& point,
    const Triangle3<Real>& triangle)
    :
    mPoint(&point),
    mTriangle(&triangle)
{
}
//----------------------------------------------------------------------------
template <typename Real>
const Vector3<Real>& DistPoint3Triangle3<Real>::GetPoint () const
{
    return *mPoint;
}
//----------------------------------------------------------------------------
template <typename Real>
const Triangle3<Real>& DistPoint3Triangle3<Real>::GetTriangle () const
{
    return *mTriangle;
}
//----------------------------------------------------------------------------
template <typename Real>
Real DistPoint3Triangle3<Real>::Get ()
{
    return Math<Real>::Sqrt(GetSquared());
}
//----------------------------------------------------------------------------
template <typename Real>
Real DistPoint3Triangle3<Real>::GetSquared ()
{
    Vector3<Real> diff = mTriangle->V[0] - *mPoint;
    Vector3<Real> edge0 = mTriangle->V[1] - mTriangle->V[0];
    Vector3<Real> edge1 = mTriangle->V[2] - mTriangle->V[0];
    Real a00 = edge0.SquaredLength();
    Real a01 = edge0.Dot(edge1);
    Real a11 = edge1.SquaredLength();
    Real b0 = diff.Dot(edge0);
    Real b1 = diff.Dot(edge1);
    Real c = diff.SquaredLength();
    Real det = Math<Real>::FAbs(a00*a11 - a01*a01);
    Real s = a01*b1 - a11*b0;
    Real t = a01*b0 - a00*b1;
    Real sqrDistance;

    if (s + t <= det)
    {
        if (s < (Real)0)
        {
            if (t < (Real)0)  // region 4
            {
                if (b0 < (Real)0)
                {
                    t = (Real)0;
                    if (-b0 >= a00)
                    {
                        s = (Real)1;
                        sqrDistance = a00 + ((Real)2)*b0 + c;
                    }
                    else
                    {
                        s = -b0/a00;
                        sqrDistance = b0*s + c;
                    }
                }
                else
                {
                    s = (Real)0;
                    if (b1 >= (Real)0)
                    {
                        t = (Real)0;
                        sqrDistance = c;
                    }
                    else if (-b1 >= a11)
                    {
                        t = (Real)1;
                        sqrDistance = a11 + ((Real)2)*b1 + c;
                    }
                    else
                    {
                        t = -b1/a11;
                        sqrDistance = b1*t + c;
                    }
                }
            }
            else  // region 3
            {
                s = (Real)0;
                if (b1 >= (Real)0)
                {
                    t = (Real)0;
                    sqrDistance = c;
                }
                else if (-b1 >= a11)
                {
                    t = (Real)1;
                    sqrDistance = a11 + ((Real)2)*b1 + c;
                }
                else
                {
                    t = -b1/a11;
                    sqrDistance = b1*t + c;
                }
            }
        }
        else if (t < (Real)0)  // region 5
        {
            t = (Real)0;
            if (b0 >= (Real)0)
            {
                s = (Real)0;
                sqrDistance = c;
            }
            else if (-b0 >= a00)
            {
                s = (Real)1;
                sqrDistance = a00 + ((Real)2)*b0 + c;
            }
            else
            {
                s = -b0/a00;
                sqrDistance = b0*s + c;
            }
        }
        else  // region 0
        {
            // minimum at interior point
            Real invDet = ((Real)1)/det;
            s *= invDet;
            t *= invDet;
            sqrDistance = s*(a00*s + a01*t + ((Real)2)*b0) +
                t*(a01*s + a11*t + ((Real)2)*b1) + c;
        }
    }
    else
    {
        Real tmp0, tmp1, numer, denom;

        if (s < (Real)0)  // region 2
        {
            tmp0 = a01 + b0;
            tmp1 = a11 + b1;
            if (tmp1 > tmp0)
            {
                numer = tmp1 - tmp0;
                denom = a00 - ((Real)2)*a01 + a11;
                if (numer >= denom)
                {
                    s = (Real)1;
                    t = (Real)0;
                    sqrDistance = a00 + ((Real)2)*b0 + c;
                }
                else
                {
                    s = numer/denom;
                    t = (Real)1 - s;
                    sqrDistance = s*(a00*s + a01*t + ((Real)2)*b0) +
                        t*(a01*s + a11*t + ((Real)2)*b1) + c;
                }
            }
            else
            {
                s = (Real)0;
                if (tmp1 <= (Real)0)
                {
                    t = (Real)1;
                    sqrDistance = a11 + ((Real)2)*b1 + c;
                }
                else if (b1 >= (Real)0)
                {
                    t = (Real)0;
                    sqrDistance = c;
                }
                else
                {
                    t = -b1/a11;
                    sqrDistance = b1*t + c;
                }
            }
        }
        else if (t < (Real)0)  // region 6
        {
            tmp0 = a01 + b1;
            tmp1 = a00 + b0;
            if (tmp1 > tmp0)
            {
                numer = tmp1 - tmp0;
                denom = a00 - ((Real)2)*a01 + a11;
                if (numer >= denom)
                {
                    t = (Real)1;
                    s = (Real)0;
                    sqrDistance = a11 + ((Real)2)*b1 + c;
                }
                else
                {
                    t = numer/denom;
                    s = (Real)1 - t;
                    sqrDistance = s*(a00*s + a01*t + ((Real)2)*b0) +
                        t*(a01*s + a11*t + ((Real)2)*b1) + c;
                }
            }
            else
            {
                t = (Real)0;
                if (tmp1 <= (Real)0)
                {
                    s = (Real)1;
                    sqrDistance = a00 + ((Real)2)*b0 + c;
                }
                else if (b0 >= (Real)0)
                {
                    s = (Real)0;
                    sqrDistance = c;
                }
                else
                {
                    s = -b0/a00;
                    sqrDistance = b0*s + c;
                }
            }
        }
        else  // region 1
        {
            numer = a11 + b1 - a01 - b0;
            if (numer <= (Real)0)
            {
                s = (Real)0;
                t = (Real)1;
                sqrDistance = a11 + ((Real)2)*b1 + c;
            }
            else
            {
                denom = a00 - ((Real)2)*a01 + a11;
                if (numer >= denom)
                {
                    s = (Real)1;
                    t = (Real)0;
                    sqrDistance = a00 + ((Real)2)*b0 + c;
                }
                else
                {
                    s = numer/denom;
                    t = (Real)1 - s;
                    sqrDistance = s*(a00*s + a01*t + ((Real)2)*b0) +
                        t*(a01*s + a11*t + ((Real)2)*b1) + c;
                }
            }
        }
    }

    // Account for numerical round-off error.
    if (sqrDistance < (Real)0)
    {
        sqrDistance = (Real)0;
    }

    mClosestPoint0 = *mPoint;
    mClosestPoint1 = mTriangle->V[0] + s*edge0 + t*edge1;
    mTriangleBary[1] = s;
    mTriangleBary[2] = t;
    mTriangleBary[0] = (Real)1 - s - t;
    return sqrDistance;
}
//----------------------------------------------------------------------------
template <typename Real>
Real DistPoint3Triangle3<Real>::Get (Real t,
    const Vector3<Real>& velocity0, const Vector3<Real>& velocity1)
{
    Vector3<Real> movedPoint = *mPoint + t*velocity0;
    Vector3<Real> movedV0 = mTriangle->V[0] + t*velocity1;
    Vector3<Real> movedV1 = mTriangle->V[1] + t*velocity1;
    Vector3<Real> movedV2 = mTriangle->V[2] + t*velocity1;
    Triangle3<Real> movedTriangle(movedV0, movedV1, movedV2);
    return DistPoint3Triangle3<Real>(movedPoint, movedTriangle).Get();
}
//----------------------------------------------------------------------------
template <typename Real>
Real DistPoint3Triangle3<Real>::GetSquared (Real t,
    const Vector3<Real>& velocity0, const Vector3<Real>& velocity1)
{
    Vector3<Real> movedPoint = *mPoint + t*velocity0;
    Vector3<Real> movedV0 = mTriangle->V[0] + t*velocity1;
    Vector3<Real> movedV1 = mTriangle->V[1] + t*velocity1;
    Vector3<Real> movedV2 = mTriangle->V[2] + t*velocity1;
    Triangle3<Real> movedTriangle(movedV0, movedV1, movedV2);
    return DistPoint3Triangle3<Real>(movedPoint, movedTriangle).GetSquared();
}
//----------------------------------------------------------------------------
template <typename Real>
Real DistPoint3Triangle3<Real>::GetTriangleBary (int i) const
{
    return mTriangleBary[i];
}
//----------------------------------------------------------------------------

//----------------------------------------------------------------------------
// Explicit instantiation.
//----------------------------------------------------------------------------
template WM5_MATHEMATICS_ITEM
class DistPoint3Triangle3<float>;

template WM5_MATHEMATICS_ITEM
class DistPoint3Triangle3<double>;
//----------------------------------------------------------------------------
}
