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
  duration: z.number().min(1, "Süre 1 dakikadan az olamaz.").max(1440, "Süre 24 saati geçemez."), // Number
  price: z.number().min(0, "Fiyat negatif olamaz."), // Number
});


export function AddServiceForm() {
  const { userData } = useUserDataStore();
  const { fetchServices } = useServiceStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: 30, // Number
      price: 0, // Number
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await createService(values, userData!.companyUuid!);
    if (response.status) {
      toast({
        title: "Success",
        description: response.message,
        variant: "success",
      });
      form.reset();
      fetchServices(userData!.companyUuid!, true);
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
                <FormLabel className="font-semibold text-base">Hizmet Süresi (Dakika)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="1"
                    min="1"
                    max="1440"
                    onChange={(e) => field.onChange(Number(e.target.value))} // Değeri number olarak işle
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
                <FormLabel className="font-semibold text-base">Hizmet Fiyatı (₺)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    min="0"
                    onChange={(e) => field.onChange(Number(e.target.value))} // Değeri number olarak işle
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
