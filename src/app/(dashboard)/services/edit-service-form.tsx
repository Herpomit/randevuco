"use client";;
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
import { useServiceStore } from "@/stores/useServiceStore";
import { deleteService, updateService } from "./services-action";
import { toast } from "@/hooks/use-toast";
import useUserDataStore from "@/stores/useUserDataStore";

const formSchema = z.object({
  name: z.string().min(1, "Hizmet adı zorunludur").max(255),
  duration: z
    .preprocess(
      (val) => (typeof val === "string" || typeof val === "number" ? Number(val) : val),
      z.number().min(1, "Hizmet süresi bir sayı olmalıdır")
    ),
  price: z
    .preprocess(
      (val) =>
        typeof val === "string"
          ? Number(val.replace(",", "."))
          : typeof val === "number"
            ? val
            : undefined,
      z.number().min(0, "Fiyat bir sayı olmalıdır")
    ),
  showOnline: z.boolean().default(false),
  acceptPayment: z.boolean().default(false),
  paymentType: z.enum(["full", "partial"]).optional(),
  partialAmount: z
    .preprocess(
      (val) =>
        typeof val === "string"
          ? Number(val.replace(",", "."))
          : typeof val === "number"
            ? val
            : undefined,
      z.number().optional()
    ),
});

export function EditServiceForm() {
  const { selectedService, fetchServices, clearSelectedService } = useServiceStore();
  const { userData } = useUserDataStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      duration: 0, // Başlangıç değeri bir sayı
      price: 0, // Başlangıç değeri bir sayı
      showOnline: false,
      acceptPayment: false,
      paymentType: "full",
      partialAmount: undefined,
    },
  });

  // Formun yalnızca `selectedService` değiştiğinde resetlenmesini sağla
  useEffect(() => {
    if (selectedService) {
      form.reset({
        name: selectedService.name,
        duration: selectedService.duration,
        price: selectedService.price,
        showOnline: selectedService.showOnline || false,
        acceptPayment: selectedService.acceptPayment || false,
        paymentType: selectedService.paymentType || "full",
        partialAmount: selectedService.partialAmount,
      });
    }
  }, [selectedService, form]);


  const showOnline = form.watch("showOnline");
  const acceptPayment = form.watch("acceptPayment");
  const paymentType = form.watch("paymentType");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await updateService({
      uuid: selectedService!.uuid,
      name: values.name,
      duration: values.duration,
      price: values.price,
      showOnline: values.showOnline,
      acceptPayment: values.acceptPayment,
      paymentType: values.paymentType,
      partialAmount: values.partialAmount,
    });

    if (response.status) {
      toast({
        title: "Success",
        description: response.message,
        variant: "success",
      });
      // Listeyi yeniden yükle ve formu sıfırla
      await fetchServices(userData!.companyUuid!, true);
      form.reset({
        name: "",
        duration: 0,
        price: 0,
        showOnline: false,
        acceptPayment: false,
        paymentType: "full",
        partialAmount: undefined,
      }); // Formu sıfırla
      clearSelectedService(); // Seçili hizmeti temizle
    } else {
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      });
    }


    // API çağrısı veya başka işlemler için uygun şekilde `values` işlenir
  }

  async function onDelete() {

    if (!selectedService || !selectedService.uuid) {
      return;
    }
    const uuid = selectedService.uuid;

    const response = await deleteService(uuid);
    if (response.status) {
      toast({
        title: "Success",
        description: response.message,
        variant: "success",
      });
      // Listeyi yeniden yükle ve formu sıfırla
      await fetchServices(userData!.companyUuid!, true);
      form.reset({
        name: "",
        duration: 0,
        price: 0,
        showOnline: false,
        acceptPayment: false,
        paymentType: "full",
        partialAmount: undefined,
      }); // Formu sıfırla
      clearSelectedService(); // Seçili hizmeti temizle
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
        <div className="grid grid-cols-1 gap-y-4">
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
                    type="number"
                    className="h-10 shadow-inner"
                    {...field} // `onChange` tanımlamasını burada bırakıyoruz
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
                    type="text"
                    className="h-10 shadow-inner"
                    {...field} // `onChange` yerine dönüşüm `zod` ile yapılır
                  />
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
                        <SelectItem value="partial">Bir kısmı alınsın</SelectItem>
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
                      <FormLabel className="font-semibold text-base">Alınacak Miktar (₺)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="h-10 shadow-inner"
                          {...field} // `onChange` kaldırıldı
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
          <div className="flex items-center justify-center gap-2">
            <Button
              className="bg-[#6857f6] text-white hover:bg-[#5648C9] text-base w-full"
              type="submit"
            >
              <RefreshCw />
              Güncelle
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-700 text-base w-full"
              type="button"
              onClick={() => onDelete()}
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

