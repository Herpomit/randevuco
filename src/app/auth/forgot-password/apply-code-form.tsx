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
  FormMessage,
} from "@/components/ui/form";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
const formSchema = z.object({
  code: z.string().min(6, { message: "Boş Bırakılamaz!" }).max(6),
});

export function ApplyCodeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="text-center text-sm -mt-4">
          Lütfen 6 haneli kodu giriniz.
        </div>
        <div className="grid grid-cols-1 gap-4 items-center justify-center">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <InputOTP
                    className=""
                    {...field}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-[#deff36] hover:bg-[#c4e12f] text-black text-base font-semibold "
            type="submit"
          >
            Devam Et
          </Button>
        </div>
      </form>
    </Form>
  );
}
