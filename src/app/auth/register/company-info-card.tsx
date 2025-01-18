"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Logo from "../../../components/specials/logo";
import Link from "next/link";
import { useState } from "react";
import { CompanyInfoForm } from "./company-info-form";
import LocationPicker from "./location-picker";
import ModalContainer from "@/components/modals/modal-container";

interface Props {
  setStep: (step: number) => void;
  userUuid: string;
  step: number;
}

export default function CompanyInfoCard({ userUuid }: Props) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  return (
    <>
      <div className=" w-full md:px-[10%] md:-mt-12 flex items-center justify-center">
        <div className="mx-auto p-6 w-full flex items-center justify-center ">
          <div className="grid  gap-6 grid-cols-1 lg:grid-cols-2 w-full h-dvh py-16 lg:py-0 lg:h-[40rem]">
            <Card className=" p-6 shadow-lg ">
              <div className="space-y-6">
                <div className=" ">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">Kayıt Ol</h1>
                      <p className="text-sm text-muted-foreground">RandevuCo</p>
                    </div>
                    <div>
                      <Logo className="w-16" />
                    </div>
                  </div>

                  <CardContent className="mt-4 p-0">
                    <CompanyInfoForm location={position} userUuid={userUuid} />
                  </CardContent>
                  <CardFooter className="w-full flex flex-col items-center justify-center gap-y-4 mt-4">
                    <div className=" text-center text-sm">
                      Zaten Hesabınız mı?
                      <Link
                        href="/auth/login"
                        className="underline underline-offset-4 ml-1"
                      >
                        Giriş Yapın
                      </Link>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      RandevuCo - 2024
                    </CardDescription>
                  </CardFooter>
                  <div className="text-center text-xs text-gray-400">
                    <p className="mt-1">
                      Devam ederek{" "}
                      <ModalContainer
                        button="Kullanım Koşulları"
                        triggerClass="text-black"
                        contentClass="max-w-xs md:max-w-3xl lg:max-w-5xl"
                        title="Kullanım Koşulları"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perspiciatis asperiores vitae ipsam deleniti ducimus
                        amet ullam ipsum recusandae voluptatem aperiam culpa id
                        doloribus, quae corporis maiores veniam quam. Natus,
                        eius.
                      </ModalContainer>{" "}
                      ve{" "}
                      <a href="#" className="text-primary hover:underline">
                        <ModalContainer
                          button="Gizlilik Politikası"
                          triggerClass="text-black"
                          contentClass="max-w-xs md:max-w-3xl lg:max-w-5xl"
                          title="Gizlilik Politikası"
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quasi quia debitis earum quos perspiciatis
                          repudiandae necessitatibus unde accusamus in nihil,
                          repellendus voluptates odio consequatur, quis esse
                          aliquam, iure neque. Minima.
                        </ModalContainer>
                      </a>
                      {"'"}nı kabul etmiş olursunuz.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center w-full">
              <LocationPicker setPosition={setPosition} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
