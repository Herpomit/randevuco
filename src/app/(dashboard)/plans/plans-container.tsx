"use client";
import { useState } from "react";
import PlansDetailsPage from "./plans-details-page";
import PlansPaymentPage from "./plans-payment-page"; // Assuming this component exists

export default function PlansContainer() {
  const [step] = useState(2);

  return (
    <div className="w-full h-dvh flex flex-col gap-4 items-center justify-center ">
      {step === 1 && <PlansDetailsPage />}
      {step === 2 && <PlansPaymentPage />}
    </div>
  );
}
