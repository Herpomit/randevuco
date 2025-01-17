"use client";;
import RegisterCard from "@/app/auth/register/register-card";
import { useState } from "react";
import CompanyInfoCard from "./company-info-card";

export default function RegisterContainer() {
  const [step, setStep] = useState(1);
  const [uuid, setUuid] = useState("");
  return (
    <div className="w-full h-dvh flex flex-col gap-4 items-center justify-center  bg-white">
      {step === 1 && <RegisterCard setStep={setStep} setUuid={setUuid} />}
      {step === 2 && <CompanyInfoCard setStep={setStep} userUuid={uuid} step={step} />}

    </div>
  );
}
