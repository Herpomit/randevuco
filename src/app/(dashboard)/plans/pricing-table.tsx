"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PricingFeature[];
  isPopular?: boolean;
}

interface PricingTableProps {
  tiers: PricingTier[];
}

export default function PricingTable({ tiers }: PricingTableProps) {
  const [isYearly, setIsYearly] = useState(false);
  const router = useRouter();

  const handlePackageSelect = (tier: PricingTier) => {
    const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;
    router.push(`/payment?package=${tier.name}&amount=${price}`);
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="mb-8 flex justify-center gap-2">
        <Toggle
          pressed={!isYearly}
          onPressedChange={() => setIsYearly(false)}
          className="data-[state=on]:bg-[#6857f6]"
        >
          Aylık
        </Toggle>
        <Toggle
          pressed={isYearly}
          onPressedChange={() => setIsYearly(true)}
          className="data-[state=on]:bg-[#6857f6]"
        >
          Yıllık
        </Toggle>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden ${
              tier.isPopular ? "border-[#6857f6]" : ""
            }`}
          >
            {tier.isPopular && (
              <div className="absolute right-4 top-4 rounded-full bg-[#6857f6] px-3 py-1 text-xs text-white">
                Popüler Paket
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  {isYearly ? tier.yearlyPrice : tier.monthlyPrice} ₺
                </span>
                <span className="text-muted-foreground">
                  /{isYearly ? "Yıllık" : "Aylık"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button
                onClick={() => handlePackageSelect(tier)}
                className={`w-full ${
                  tier.isPopular ? "bg-[#6857f6] hover:bg-[#5746e5]" : ""
                }`}
                variant={tier.isPopular ? "default" : "outline"}
              >
                Paketi Seç
              </Button>
              <ul className="grid gap-3">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#6857f6]" />
                    <span className="text-sm">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
