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
import Link from "next/link";

const formSchema = z
  .object({
    newPassword: z.string().min(1, "Boş Bırakılamaz").max(255),
    confirmPassword: z.string().min(1, "Boş Bırakılamaz").max(255),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Parolalar aynı değil.",
    path: ["confirmPassword"], // Hata 'confirmPassword' alanına eklenir
  });

export function NewPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between">
                  <FormLabel className="font-semibold text-base">
                    Yeni Parola
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    className="h-10 shadow-inner"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between">
                  <FormLabel className="font-semibold text-base">
                    Yeni Parola Tekrarı
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    className="h-10 shadow-inner"
                    type="password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Link href="/auth/login" className="w-full ">
            <Button
              className="bg-[#deff36] hover:bg-[#c4e12f] text-black text-base font-semibold w-full"
              type="submit"
            >
              Devam Et
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
