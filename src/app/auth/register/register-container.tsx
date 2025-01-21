"use client";

import RegisterCard from "@/app/auth/register/register-card";
import { useState, useEffect } from "react";
import CompanyInfoCard from "./company-info-card";
import { useSearchParams } from "next/navigation";

export default function RegisterContainer() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    const userUuid = searchParams.get("uid"); // URL'den userUuid parametresini al
    if (userUuid) {
      setStep(2); // Eğer parametre varsa step 2'ye ayarla
      setUuid(userUuid); // userUuid state'ini güncelle
    }
  }, [searchParams]);

  return (
    <div className="w-full h-dvh flex flex-col gap-4 items-center justify-center bg-white">
      {step === 1 && <RegisterCard setStep={setStep} setUuid={setUuid} />}
      {step === 2 && <CompanyInfoCard setStep={setStep} userUuid={uuid} step={step} setUserUuid={setUuid} />}
    </div>
  );
}
