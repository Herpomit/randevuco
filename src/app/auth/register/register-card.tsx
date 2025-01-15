import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "../../../components/specials/logo";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterCard() {
  return (
    <>
      <Card className="shadow-inner w-full max-w-lg rounded-2xl ">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start justify-center text-start ">
            <CardTitle className="text-2xl">Kayıt Ol</CardTitle>
            <CardDescription className="ml-1 text-base">
              RandevuCo
            </CardDescription>
          </div>
          <div>
            <Logo className="w-16" />
          </div>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="w-full flex flex-col items-center justify-center gap-y-4">
          <div className=" text-center text-sm">
            Zaten Hesabınız mı?
            <Link
              href="/auth/login"
              className="underline underline-offset-4 ml-1"
            >
              Giriş Yapın
            </Link>
          </div>
          <CardDescription className="text-muted-foreground">
            RandevuCo - 2024
          </CardDescription>
        </CardFooter>
      </Card>
      <div className="text-balance text-center text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  max-w-sm">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </>
  );
}
