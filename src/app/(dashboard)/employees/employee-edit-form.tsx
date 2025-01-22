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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { RefreshCw, Trash2 } from "lucide-react";
import useEmployeeStore from "@/stores/useEmployeeStore";
import { toast } from "@/hooks/use-toast";
import useUserDataStore from "@/stores/useUserDataStore";

const formSchema = z.object({
  employeeName: z.string().min(1, "Boş Bırakılamaz").max(255, "255 karakterden uzun olamaz."),
  employeePhone: z.string().min(1, "Boş Bırakılamaz").max(255, "255 karakterden uzun olamaz."),
  employeeColor: z.string().min(1).max(255),
});

export function EmployeeEditForm() {
  const [color, setColor] = useState("#ff69b4"); // Varsayılan renk
  const { selectedEmployee, clearSelectedEmployee, updateEmployee } = useEmployeeStore();
  const { userData } = useUserDataStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeName: "",
      employeePhone: "",
      employeeColor: "#ff69b4", // Varsayılan renk değeri
    },
  });

  const defaultColors = ["#ff69b4", "#d1ffd6", "#add8e6", "#dda0dd"];

  useEffect(() => {
    if (selectedEmployee) {
      form.setValue("employeeName", selectedEmployee.name);
      form.setValue("employeePhone", selectedEmployee.phone);
      form.setValue("employeeColor", selectedEmployee.color);
      setColor(selectedEmployee.color);
    }
  }, [selectedEmployee, form]);

  function handleColorSelect(selectedColor: string) {
    setColor(selectedColor);
    form.setValue("employeeColor", selectedColor); // Seçilen rengi formda güncelle
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedEmployee) {
      toast({
        title: "Hata",
        description: "Personel bilgileri eksik.",
        variant: "destructive",
      })
      return;
    }

    const response = await updateEmployee({
      uuid: selectedEmployee.uuid!,
      name: values.employeeName,
      phone: values.employeePhone,
      color: values.employeeColor,
      companyUuid: userData!.companyUuid!,
    });

    if (response.status) {
      toast({
        title: "Success",
        description: response.message,
        variant: "success",
      });
      // Listeyi yeniden yükle ve formu sıfırla
      form.reset({
        employeeName: "",
        employeePhone: "",
        employeeColor: "#ff69b4", // Varsayılan renk değeri
      }); // Formu sıfırla
      clearSelectedEmployee(); // Seçili personeli temizle
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
                        className={`w-10 h-10 rounded-full cursor-pointer border ${color === defaultColor
                          ? "border-black border-2"
                          : "border-transparent"
                          }`}
                        style={{ backgroundColor: defaultColor }}
                        onClick={() => handleColorSelect(defaultColor)}
                      />
                    ))}
                    <div
                      className={`w-10 h-10 rounded-full border ${!defaultColors.includes(color) ? "border-black border-2" : "border-transparent"
                        }`}
                      style={{
                        background: `linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(255,194,0,1) 25%, rgba(183,255,0,1) 40%, rgba(0,255,121,1) 60%, rgba(5,67,255,1) 90%)`,
                      }}
                    >
                      <Input
                        {...field}
                        type="color"
                        value={color}
                        onChange={(e) => handleColorSelect(e.target.value)}
                        className="inset-0 opacity-0 cursor-pointer h-10 w-10 rounded-full"
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
