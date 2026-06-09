import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.CRM_JWT_SECRET ?? "dev-fallback-secret-change-in-production"
);

export async function signToken(payload: { email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string };
  } catch {
    return null;
  }
}
