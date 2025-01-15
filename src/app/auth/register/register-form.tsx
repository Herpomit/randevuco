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
import { register } from "../../../backend/actions/auth-actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
const formSchema = z
  .object({
    name: z.string().min(1, "Boş Bırakılamaz").max(255),
    phone: z
      .string()
      .regex(/^\+90 \(\d{3}\) \d{3} \d{2} \d{2}$/, "Boş Bırakılamaz."),
    email: z.string().email("Boş Bırakılamaz").min(1).max(255),
    password: z.string().min(1, "Boş Bırakılamaz").max(255),
    confirmPassword: z.string().min(1, "Boş Bırakılamaz").max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parolalar aynı değil.",
    path: ["confirmPassword"], // Hata 'confirmPassword' alanına eklenir
  });

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function registerSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted Values:", values);

    try {
      const response = await register({
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
      });

      if (response.status) {
        toast({
          title: "Success",
          description: response.message,
          variant: "success",
        });
        form.reset();
        // setTimeout(() => {
        //   router.push("/auth/login");
        // }, 2000);
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast({
        title: "Error",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(registerSubmit)}
        className=""
      >
        <div className="grid grid-cols-1 gap-4 ">
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel className="font-semibold text-base">
                      Ad Soyad
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel className="font-semibold text-base">
                      Telefon No.
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
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center justify-between">
                  <FormLabel className="font-semibold text-base">
                    E-posta
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input className="h-10 shadow-inner" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center justify-between">
                    <FormLabel className="font-semibold text-base">
                      Parola
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
                      Parola Tekrarı
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
          </div>
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
