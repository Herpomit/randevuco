import PricingTable, { PricingTier } from "./pricing-table";

const pricingTiers: PricingTier[] = [
  {
    name: "Plus",
    description: "Bireysel ve küçük işletmeler için",
    monthlyPrice: 590,
    yearlyPrice: 4900,
    features: [
      { text: "150 Randevu/Aylık", included: true },
      { text: "Sınırsız Randevu Hatırlatıcı", included: true },
      { text: "Sınırsız Personel", included: true },
      { text: "Sınırsız Müşteri", included: true },
      { text: "Online Randevu", included: true },
      { text: "Yapay Zeka Asistanı", included: true },
      { text: "Performans Takibi", included: true },
    ],
  },
  {
    name: "Pro",
    description: "Orta ölçekli işletmeler için",
    monthlyPrice: 990,
    yearlyPrice: 7900,
    features: [
      { text: "400 Randevu/Aylık", included: true },
      { text: "Sınırsız Randevu Hatırlatıcı", included: true },
      { text: "Sınırsız Personel", included: true },
      { text: "Sınırsız Müşteri", included: true },
      { text: "Online Randevu", included: true },
      { text: "Yapay Zeka Asistanı", included: true },
      { text: "Performans Takibi", included: true },
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    description: "Yoğun randevu alan işletmeler için",
    monthlyPrice: 1490,
    yearlyPrice: 10900,
    features: [
      { text: "Sınırsız Randevu", included: true },
      { text: "Sınırsız Randevu Hatırlatıcı", included: true },
      { text: "Sınırsız Personel", included: true },
      { text: "Sınırsız Müşteri", included: true },
      { text: "Online Randevu", included: true },
      { text: "Yapay Zeka Asistanı", included: true },
      { text: "Performans Takibi", included: true },
    ],
  },
];

export default function PlansDetailsPage() {
  return (
    <div className="max-w-6xl w-full mx-auto">
      <PricingTable tiers={pricingTiers} />
    </div>
  );
}
