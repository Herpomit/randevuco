import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "./login-form";
import Logo from "../../../components/specials/logo";
import Link from "next/link";

export default function LoginCard() {
  return (
    <Card className="shadow-inner w-full max-w-sm rounded-2xl ">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-center text-start ">
          <CardTitle className="text-2xl">Giriş Yap</CardTitle>
          <CardDescription className="ml-1 text-base">
            RandevuCo
          </CardDescription>
        </div>
        <div>
          <Logo className="w-16" />
        </div>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="w-full flex flex-col items-center justify-center gap-y-4">
        <div className=" text-center text-sm">
          Hesabınız yok mu?
          <Link
            href="/auth/register"
            className="underline underline-offset-4 ml-1"
          >
            Kayıt Olun
          </Link>
        </div>
        <CardDescription className="text-muted-foreground">
          RandevuCo - 2024
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
