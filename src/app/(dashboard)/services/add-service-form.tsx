"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { Plus } from "lucide-react";
import useUserDataStore from "@/stores/useUserDataStore";
import { createService } from "./services-action";
import { toast } from "@/hooks/use-toast";
import { useServiceStore } from "@/stores/useServiceStore";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Hizmet adı gereklidir.")
    .max(255, "Hizmet adı 255 karakterden uzun olamaz."),
  duration: z
    .string()
    .refine((val) => /^\d+$/.test(val), "Sadece rakam girebilirsiniz.")
    .refine((val) => parseInt(val) >= 1 && parseInt(val) <= 1440, {
      message: "Süre 1 ile 1440 dakika arasında olmalıdır.",
    }),
  price: z
    .string()
    .refine((val) => /^\d*\.?\d*$/.test(val), "Sadece rakam ve ondalık nokta girebilirsiniz.")
    .refine((val) => parseFloat(val) >= 0, {
      message: "Fiyat negatif olamaz.",
    }),
});


type AddServiceFormProps = {
  setOpen: (open: boolean) => void;
};

export function AddServiceForm({ setOpen }: AddServiceFormProps) {
  const { userData } = useUserDataStore();
  const { fetchServices } = useServiceStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: "0", // Varsayılan olarak string
      price: "0", // Varsayılan olarak string
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const transformedValues = {
      ...values,
      duration: Number(values.duration),
      price: Number(values.price),
    };


    const response = await createService(transformedValues, userData!.companyUuid!);
    if (response.status) {
      toast({
        title: "Success",
        description: response.message,
        variant: "success",
      });
      form.reset();
      fetchServices(userData!.companyUuid!, true);
      setOpen(false);
    } else {
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4  pt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">Hizmet Adı</FormLabel>
                <FormControl>
                  <Input className="h-10 shadow-inner" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Hizmet Süresi (Dakika)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text" // type'ı text yaptık
                    inputMode="numeric" // Mobil cihazlarda sadece sayı klavyesini gösterir
                    pattern="[0-9]*" // HTML5 doğrulama için sadece rakamlara izin verir
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Hizmet Fiyatı (₺)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    inputMode="decimal" // Ondalık sayı klavyesi
                    pattern="^\d*\.?\d*$" // Sayı ve ondalık nokta için regex
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-[#6857f6] text-white hover:bg-[#5648C9] text-base w-full  "
            type="submit"
          >
            <Plus className="" />
            Ekle
          </Button>
        </div>
      </form>
    </Form>
  );
}
