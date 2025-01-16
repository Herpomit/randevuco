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
const formSchema = z.object({
  email: z.string().min(1).max(255),
});

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="text-center text-sm -mt-4">
          Lütfen E-posta adresinizi giriniz.
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  E-posta
                </FormLabel>
                <FormControl>
                  <Input className="h-10 shadow-inner" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-[#deff36] hover:bg-[#c4e12f] text-black text-base font-semibold"
            type="submit"
          >
            Kod Al
          </Button>
        </div>
      </form>
    </Form>
  );
}
