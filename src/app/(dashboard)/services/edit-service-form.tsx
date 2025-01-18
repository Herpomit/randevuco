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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Service } from "./services-list";

const formSchema = z.object({
  serviceName: z.string().min(1, "Hizmet adı zorunludur").max(255),
  serviceTime: z.string().min(1, "Hizmet süresi zorunludur").max(255),
  servicePrice: z.string().min(1, "Hizmet fiyatı zorunludur").max(255),
  showOnline: z.boolean().default(false),
  acceptPayment: z.boolean().default(false),
  paymentType: z.enum(["full", "partial"]).optional(),
  partialAmount: z.string().optional(),
});

interface EditServiceFormProps {
  selectedService: Service | null;
}

export function EditServiceForm({ selectedService }: EditServiceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      serviceTime: "",
      servicePrice: "",
      showOnline: false,
      acceptPayment: false,
      paymentType: "full",
      partialAmount: "",
    },
  });

  useEffect(() => {
    if (selectedService) {
      form.reset({
        serviceName: selectedService.name,
        serviceTime: selectedService.duration,
        servicePrice: selectedService.price,
        // Assuming other fields are not part of the initial data
        showOnline: false,
        acceptPayment: false,
        paymentType: "full",
        partialAmount: "",
      });
    }
  }, [selectedService, form]);

  const showOnline = form.watch("showOnline");
  const acceptPayment = form.watch("acceptPayment");
  const paymentType = form.watch("paymentType");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-y-4">
          <FormField
            control={form.control}
            name="serviceName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Hizmet Adı
                </FormLabel>
                <FormControl>
                  <Input className="h-10 shadow-inner" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Hizmet Süresi
                </FormLabel>
                <FormControl>
                  <Input className="h-10 shadow-inner" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servicePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Hizmet Fiyatı
                </FormLabel>
                <FormControl>
                  <Input className="h-10 shadow-inner" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showOnline"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between space-y-0">
                <FormLabel className="font-semibold text-base">
                  Bu hizmet Online Mağaza{"'"}da gösterilsin mi?
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {showOnline && (
            <FormField
              control={form.control}
              name="acceptPayment"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-y-0">
                  <FormLabel className="font-semibold text-base">
                    Kredi kartı ile ödeme alınsın mı?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {showOnline && acceptPayment && (
            <>
              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-base">
                      Alınacak ödemenin ne kadarı alınsın?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-10 shadow-inner">
                          <SelectValue placeholder="Ödeme türünü seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="full">Tamamı alınsın</SelectItem>
                        <SelectItem value="partial">
                          Bir kısmı alınsın
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {paymentType === "partial" && (
                <FormField
                  control={form.control}
                  name="partialAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-base">
                        Alınacak Miktar (₺)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="h-10 shadow-inner"
                          placeholder="Alınacak miktarı girin (₺)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          <div className=" flex items-center justify-center gap-2">
            <Button
              className="bg-[#6857f6] text-white hover:bg-[#5648C9] text-base w-full "
              type="submit"
            >
              <RefreshCw />
              Güncelle
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-700 text-base w-full "
              type="submit"
            >
              <Trash2 />
              Sil
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
