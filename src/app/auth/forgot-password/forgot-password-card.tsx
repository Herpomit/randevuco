"use client";
import { ApplyCodeForm } from "@/app/auth/forgot-password/apply-code-form";
import { ForgotPasswordForm } from "@/app/auth/forgot-password/forgot-password-form";
import { NewPasswordForm } from "@/app/auth/forgot-password/new-password-form";
import Logo from "@/components/specials/logo";
import { useState } from "react";

export default function ForgotPasswordCard() {
  const [step] = useState(3);
  //   setStep gelecek

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white p-6 md:p-10">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row items-center gap-2 font-bold">
            <div className="flex h-10 w-10 items-center justify-center rounded-md">
              <Logo className="w-24" />
            </div>
            <span className="text-xl">RandevuCo</span>
          </div>
          <h1 className="text-xl font-bold">Şifrenizi mi Unuttunuz?</h1>
        </div>
        <div className="w-full max-w-sm">
          {step === 1 && <ForgotPasswordForm />}
          {step === 2 && <ApplyCodeForm />}
          {step === 3 && <NewPasswordForm />}
        </div>
      </div>
    </>
  );
}
