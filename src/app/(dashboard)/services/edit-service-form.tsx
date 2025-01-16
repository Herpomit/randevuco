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
const formSchema = z.object({
  serviceName: z.string().min(1).max(255),
  serviceTime: z.string().min(1).max(255),
  servicePrice: z.string().min(1).max(255),
});

export function EditServiceForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      serviceTime: "",
      servicePrice: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-y-4 ">
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

          <div className="grid grid-cols-2 gap-4">
            <Button
              className="bg-[#deff36] hover:bg-[#c4e12f] text-black text-base w-full font-semibold "
              type="submit"
            >
              Düzenle
            </Button>
            <Button
              className="bg-[#ff3636] hover:bg-[#c72c2c] text-white text-base w-full font-semibold "
              type="submit"
            >
              Sil
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
