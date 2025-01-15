import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { DataDecrypt } from "./helpers/data-cryptor";
import { verifyToken } from "./helpers/verify-token";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get("uToken");

  const allowedPathsWithoutAuth = ["/auth/login", "/auth/register"]; // Giriş yapılmadan erişime izin verilen yollar
  const currentPath = req.nextUrl.pathname; // İsteğin mevcut yolu
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  if (allowedPathsWithoutAuth.includes(currentPath)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (encryptedToken?.value) {
    const decodedToken = await DataDecrypt(encryptedToken.value);
    const tokenPayload = await verifyToken(decodedToken);

    if (!tokenPayload) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    } else {
      return NextResponse.next();
    }
  } else {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// Middleware'in hangi yollar için geçerli olduğunu belirleyin
export const config = {
  matcher: ["/"], // Tüm yollar için middleware'i etkinleştir
};
