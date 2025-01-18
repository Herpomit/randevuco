"use server";

import { DataDecrypt } from "@/helpers/data-cryptor";
import CustomeResponse from "@/helpers/response-message";
import { verifyToken } from "@/helpers/verify-token";
import { cookies } from "next/headers";

export const getCookieData = async () => {
    try {
        const cookieStore = await cookies();
        const cryptedToken = cookieStore.get("uToken")?.value;

        if (!cryptedToken) {
            return CustomeResponse({ status: false, message: "Token bulunamadı" });
        }

        // Token'ı çöz
        const token = await DataDecrypt(cryptedToken);

        // Token'ı doğrula ve çöz
        const payload = await verifyToken(token);
        if (!payload || !payload.name) {
            return CustomeResponse({ status: false, message: "Token gecerli degil" });
        }

        // Username'i döndür
        return CustomeResponse({ status: true, message: "Kullanıcı Verileri Getirildi", data: payload });
    } catch (error) {
        if (error instanceof Error) {
            return CustomeResponse({ status: false, message: "Token gecerli degil" });
        }
        return CustomeResponse({ status: false, message: "Token gecerli degil" });
    }
};