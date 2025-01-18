import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RefreshCw, Trash2 } from "lucide-react";

const formSchema = z.object({
  employeeName: z.string().min(1).max(255),
  employeePhone: z.string().min(1).max(255),
  employeeColor: z.string().min(1).max(255),
});

export function EmployeeFirstForm() {
  const [color, setColor] = useState("#ff69b4"); // Varsayılan renk
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      employeePhone: "",
      employeeColor: "#ff69b4", // Varsayılan renk değeri
    },
  });

  const defaultColors = ["#ff69b4", "#d1ffd6", "#add8e6", "#dda0dd"];

  function handleColorSelect(selectedColor: string) {
    setColor(selectedColor);
    form.setValue("employeeColor", selectedColor); // Seçilen rengi formda güncelle
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="employeeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Personel Adı
                </FormLabel>
                <FormControl>
                  <Input className="h-10 shadow-inner" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employeePhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Telefon No.
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
            name="employeeColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Personel Rengi
                </FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    {defaultColors.map((defaultColor) => (
                      <div
                        key={defaultColor}
                        className={`w-10 h-10 rounded-full cursor-pointer border ${
                          color === defaultColor
                            ? "border-black border-2"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: defaultColor }}
                        onClick={() => handleColorSelect(defaultColor)}
                      />
                    ))}
                    <div
                      className="rounded-full"
                      style={{
                        background: `linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,194,0,1) 25%, rgba(183,255,0,1) 40%, rgba(0,255,121,1) 60%, rgba(5,67,255,1) 90%)`,
                      }}
                    >
                      <Input
                        {...field}
                        type="color"
                        value={color}
                        onChange={(e) => handleColorSelect(e.target.value)}
                        className="inset-0 opacity-0 cursor-pointer h-10 w-10 rounded-full bg-red-500"
                      />
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

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
