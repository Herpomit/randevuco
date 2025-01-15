"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { Select } from "@mantine/core";

import cities from "@/data/cities.json";
import sectors from "@/data/sectors.json";
import React from "react";

const formSchema = z.object({
  companyName: z.string().min(1, "Boş Bırakılamaz").max(255),
  companyPhone: z
    .string()
    .regex(/^\+90 \(\d{3}\) \d{3} \d{2} \d{2}$/, "Boş Bırakılamaz."),
  sector: z.string().min(1, "Boş Bırakılamaz").max(255),
  city: z.string().min(1, "Boş Bırakılamaz").max(255),
});

export function CompanyInfoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyPhone: "",
      sector: "",
      city: "",
    },
  });

  async function registerSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted Values:", values);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(registerSubmit)}
        className=""
      >
        <div className="grid grid-cols-1 gap-4 ">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between">
                  <FormLabel className="font-semibold text-base">
                    İşletme Adı
                  </FormLabel>
                  <FormMessage />
                </div>

                <FormControl>
                  <Input className="h-10 shadow-inner" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyPhone"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between">
                  <FormLabel className="font-semibold text-base">
                    İşletme Telefonu
                  </FormLabel>
                  <FormMessage />
                </div>

                <FormControl>
                  <Input
                    className="h-10 shadow-inner"
                    {...field}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, ""); // Sadece rakamları al

                      // +90 ekleme ve sabitleme
                      if (!value.startsWith("90")) {
                        value = "90" + value;
                      }

                      // 10 haneli numara sınırı
                      value = value.slice(0, 12); // +90 dahil toplam 12 karakter sınırı

                      // Formatlama
                      const formattedValue = `+${value.slice(
                        0,
                        2
                      )} (${value.slice(2, 5)}) ${value.slice(
                        5,
                        8
                      )} ${value.slice(8, 10)} ${value.slice(10, 12)}`.trim();

                      field.onChange(formattedValue); // Güncellenmiş değeri form durumuna yaz
                    }}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel className="font-semibold text-base">
                      Sektör
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Select
                      classNames={{
                        input: " shadow-inner focus:border-black px-2",
                      }}
                      styles={{
                        input: {
                          height: "2.5rem",
                        },
                      }}
                      checkIconPosition="right"
                      placeholder="Lütfen şehir seçiniz."
                      data={sectors.sectors}
                      searchable
                      {...field}
                      radius={6}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel className="font-semibold text-base">
                      Şehir
                    </FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Select
                      classNames={{
                        input: " shadow-inner focus:border-black",
                      }}
                      styles={{
                        input: {
                          height: "2.5rem",
                        },
                      }}
                      checkIconPosition="right"
                      placeholder="Lütfen şehir seçiniz."
                      data={cities.cities}
                      searchable
                      {...field}
                      radius={6}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <Button
            className="bg-[#deff36] hover:bg-[#c4e12f] text-black text-base font-semibold "
            type="submit"
          >
            Devam Et <ArrowRight className=" ml-1 w-4 h-4 font-bold" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
