"use server";

import { JWTPayload, jwtVerify } from "jose";

const getJwtSecretKey = () => {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error("Secret Key No");
    }

    return new TextEncoder().encode(secretKey);
};

export const verifyToken = async (
    token: string,
): Promise<JWTPayload | null> => {
    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey(), {
            algorithms: ["HS256"],
        });

        return payload as JWTPayload;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};
