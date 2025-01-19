"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, CreditCard } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function PlansPaymentPage() {
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ödeme işlemi burada gerçekleştirilecek
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col space-y-4 items-center justify-center">
      <Card className="border-0 shadow-lg  w-full max-w-3xl mx-auto -p-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">PRO Plan</CardTitle>
            <CardDescription>
              Orta ölçekli işletmeler için ideal
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-xl md:text-5xl">
              590₺
              <span className="text-muted-foreground font-light text-2xl ">
                /Aylık
              </span>
            </CardTitle>
            {/* <CardDescription>Kazanç: 59₺</CardDescription> */}
          </div>
        </CardHeader>
      </Card>
      <Card className="p-6 lg:col-span-3 border-0 shadow-lg  w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Kart Bilgileri
                </h2>
                <p className="text-sm text-gray-500">
                  Tüm kartlar desteklenmektedir
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardHolder" className="text-sm font-semibold">
                  Kart Üzerindeki İsim
                </Label>
                <Input
                  id="cardHolder"
                  placeholder="Ad Soyad"
                  className="h-10 shadow-inner"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="text-sm font-semibold">
                  Kart Numarası
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  className="h-10 shadow-inner"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-sm font-semibold">
                    Son Kullanma
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="AA/YY"
                    className="h-10 shadow-inner"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc" className="text-sm font-semibold">
                    Güvenlik Kodu
                  </Label>
                  <Input
                    id="cvc"
                    placeholder="CVC"
                    className="h-10 shadow-inner"
                    required
                  />
                </div>
              </div>
            </div>

            <Collapsible open={isDiscountOpen} onOpenChange={setIsDiscountOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="p-0 h-auto text-[#6857f6] font-semibold hover:text-[#6857f6]/90 hover:bg-transparent"
                >
                  <ChevronDown
                    className={`h-4 w-4 mr-1 transition-transform ${
                      isDiscountOpen ? "rotate-180" : ""
                    }`}
                  />
                  İndirim Kodum Var !
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="discountCode"
                    className="text-sm font-semibold"
                  >
                    Kupon Kodu
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="discountCode"
                      placeholder="Kupon kodunuzu girin"
                      className="h-10 shadow-inner"
                    />
                    <Button
                      type="button"
                      className="shrink-0 h-10 font-semibold "
                    >
                      Uygula
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <Button
            className="bg-[#6857f6] text-white hover:bg-[#5648C9] text-base w-full  "
            type="submit"
          >
            <CreditCard className="" />
            Ödemeyi Tamamla
          </Button>
        </form>
      </Card>

      {/* Sipariş Özeti */}
      {/* <Card className="lg:col-span-2 border-0 shadow-lg h-fit">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sipariş Özet
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Pro Paketi</p>
                </div>

                <div className="border-t border-b py-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 ">
                      Paket Ücreti (KDV Dahil)
                    </span>
                    <span className="font-medium">590 ₺</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>KDV (%20)</span>
                    <span>{(Number(amount) * 0.2).toFixed(2)} TL</span>
                  </div>
                </div>

                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Toplam</span>
                  <span className="text-[#6857f6]">
                    {(Number(amount) * 1.2).toFixed(2)} TL
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-[#6857f6] hover:bg-[#5746e5] text-white"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Güvenli Ödeme Yap
                </Button>

                <p className="text-xs text-center text-gray-500">
                  256-bit SSL ile güvenli ödeme
                </p>
              </div>
            </CardContent>
          </Card> */}
    </div>
  );
}
