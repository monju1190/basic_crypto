import random

class EllipticCurve:
    def __init__(self, p, a, b):
        self.p = p
        self.a = a
        self.b = b

    def is_on_curve(self, point):
        if point is None:
            return True
        x, y = point
        return (y * y - (x * x * x + self.a * x + self.b)) % self.p == 0

def inverse_mod(k, p):
    if k == 0:
        raise ZeroDivisionError('division by zero')
    if k < 0:
        return p - inverse_mod(-k, p)
    
    s, old_s = 0, 1
    t, old_t = 1, 0
    r, old_r = p, k
    
    while r != 0:
        quotient = old_r // r
        old_r, r = r, old_r - quotient * r
        old_s, s = s, old_s - quotient * s
        old_t, t = t, old_t - quotient * t
        
    gcd, x, y = old_r, old_s, old_t
    return (x % p)

def point_add(curve, P, Q):
    if P is None:
        return Q
    if Q is None:
        return P

    xp, yp = P
    xq, yq = Q
    p = curve.p

    if xp == xq and yp != yq:
        return None

    if xp == xq:
        m = (3 * xp * xp + curve.a) * inverse_mod(2 * yp, p)
    else:
        m = (yq - yp) * inverse_mod(xq - xp, p)

    xr = (m * m - xp - xq) % p
    yr = (m * (xp - xr) - yp) % p
    
    return (xr, yr)

def scalar_multiply(curve, k, P):
    if k % curve.p == 0 or P is None:
        return None
    if k < 0:
        return scalar_multiply(curve, -k, point_neg(curve, P))

    result = None
    addend = P

    while k:
        if k & 1:
            result = point_add(curve, result, addend)
        addend = point_add(curve, addend, addend)
        k >>= 1

    return result

def point_neg(curve, P):
    if P is None:
        return None
    x, y = P
    return (x, -y % curve.p)

def generate_all_points(p, a, b):
    """
    Finds all points on the curve y^2 = x^3 + ax + b over F_p.
    Used for small p to demonstrate the curve points.
    """
    points = []
    for x in range(p):
        for y in range(p):
            if (y * y) % p == (x * x * x + a * x + b) % p:
                points.append((x, y))
    return points

def ecdh_key_exchange(curve, G, private_a, private_b):
    """
    Simulates ECDH Key Exchange.
    """
    public_a = scalar_multiply(curve, private_a, G)
    public_b = scalar_multiply(curve, private_b, G)
    
    shared_secret_a = scalar_multiply(curve, private_a, public_b)
    shared_secret_b = scalar_multiply(curve, private_b, public_a)
    
    assert shared_secret_a == shared_secret_b
    
    return {
        "public_a": public_a,
        "public_b": public_b,
        "shared_secret": shared_secret_a
    }
