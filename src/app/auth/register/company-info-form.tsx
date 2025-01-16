"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import cities from "@/data/cities.json";
import sectors from "@/data/sectors.json";

const formSchema = z.object({
  companyName: z.string().min(1, "Boş Bırakılamaz").max(255),
  companyPhone: z
    .string()
    .regex(/^\+90 $$\d{3}$$ \d{3} \d{2} \d{2}$/, "Geçersiz telefon numarası"),
  sector: z.string().min(1, "Boş Bırakılamaz").max(255),
  city: z.string().min(1, "Boş Bırakılamaz").max(255),
});

export function CompanyInfoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyPhone: "",
      sector: "",
      city: "",
    },
  });

  async function registerSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted Values:", values);
    // Implement your submission logic here
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(registerSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-base">
                İşletme Adı
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
          name="companyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-base">
                İşletme Telefonu
              </FormLabel>
              <FormControl>
                <Input
                  className="h-10 shadow-inner"
                  {...field}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    if (!value.startsWith("90")) {
                      value = "90" + value;
                    }
                    value = value.slice(0, 12);
                    const formattedValue = `+${value.slice(
                      0,
                      2
                    )} (${value.slice(2, 5)}) ${value.slice(
                      5,
                      8
                    )} ${value.slice(8, 10)} ${value.slice(10, 12)}`.trim();
                    field.onChange(formattedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sector"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-base">Sektör</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between h-10 shadow-inner"
                    >
                      {field.value || "Sektör seçiniz..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Sektör ara..." />
                      <CommandList>
                        <CommandEmpty>Sektör bulunamadı.</CommandEmpty>
                        <CommandGroup>
                          {sectors.sectors.map((sector) => (
                            <CommandItem
                              key={sector}
                              value={sector}
                              onSelect={(currentValue) => {
                                form.setValue("sector", currentValue);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === sector
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {sector}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-base">Şehir</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between h-10 shadow-inner"
                    >
                      {field.value || "Lütfen şehir seçiniz..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Şehir ara..." />
                      <CommandList>
                        <CommandEmpty>Şehir bulunamadı.</CommandEmpty>
                        <CommandGroup>
                          {cities.cities.map((city) => (
                            <CommandItem
                              key={city}
                              value={city}
                              onSelect={(currentValue) => {
                                form.setValue("city", currentValue);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === city
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {city}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="bg-[#deff36] hover:bg-[#c4e12f] text-black text-base font-semibold w-full "
          type="submit"
        >
          Devam Et <ArrowRight className="ml-1 w-4 h-4 font-bold" />
        </Button>
      </form>
    </Form>
  );
}
