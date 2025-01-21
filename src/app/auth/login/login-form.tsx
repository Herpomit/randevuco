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
import { login } from "../../../backend/actions/auth-actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
});

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await login(values);

    if (response.status === true) {
      form.reset();
      if (response.data.companyUuid) {
        // Şirket varsa başarılı mesajı ve yönlendirme
        toast({
          title: "Success",
          description: "Giriş başarılı, yönlendiriliyorsunuz...",
          variant: "success",
        });

        setTimeout(() => {
          router.push("/"); // Ana sayfaya yönlendirme
        }, 1500);
      } else {
        // Şirket yoksa destructive mesaj ve yönlendirme
        toast({
          title: "Dikkat",
          description: "Hesabınıza bağlı bir şirket bulunamadı. Lütfen devam edin.",
          variant: "destructive",
        });

        const userUuid = response.data.userUuid; // Kullanıcı UUID alınır
        setTimeout(() => {
          router.push(`/auth/register?uid=${userUuid}`); // Register sayfasına yönlendirme
        }, 1500);
      }
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
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="">
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
                  <Input className="h-12 shadow-inner" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className=" flex items-center justify-between">
                  <FormLabel className="font-semibold text-base">
                    Parola
                  </FormLabel>
                  {/* formmesaj */}
                </div>

                <FormControl>
                  <Input
                    className="h-12 shadow-inner"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/auth/forgot-password"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
          >
            Şifremi Unuttum
          </Link>
          <Button
            className="bg-[#deff36] hover:bg-[#c4e12f] text-black text-base font-semibold"
            type="submit"
          >
            Giriş Yap
          </Button>
        </div>
      </form>
    </Form>
  );
}
