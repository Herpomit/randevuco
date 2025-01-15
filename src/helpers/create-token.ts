import { JWTPayload, SignJWT } from "jose";

const createToken = async (payload: JWTPayload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));
  return token;
};

export default createToken;
