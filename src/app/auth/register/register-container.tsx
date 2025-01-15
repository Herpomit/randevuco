"use client";

import RegisterCard from "@/app/auth/register/register-card";
import { useState } from "react";
import CompanyInfoCard from "./company-info-card";
import LocationPicker from "./location-picker";

export default function RegisterContainer() {
  const [step] = useState(3);
  return (
    <div className="w-full h-dvh flex flex-col gap-4 items-center justify-center  ">
      {step === 1 && <RegisterCard />}
      {step === 2 && <CompanyInfoCard />}
      {step === 3 && <LocationPicker />}
    </div>
  );
}
