
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { RefreshCw, Trash2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({ "name": z.string().min(1).max(255), "phone": z.string().min(1).max(255), "reminder": z.boolean(), "notes": z.string().min(1).max(255) })

export function CustomerEditForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            reminder: true,
            notes: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form noValidate onSubmit={form.handleSubmit(onSubmit)} >
                <div className="grid grid-cols-1 gap-4">

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-base">Ad Soyad</FormLabel>
                                <FormControl>
                                    <Input className="h-10 shadow-inner" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-base">Telefon No.</FormLabel>
                                <FormControl>
                                    <Input className="h-10 shadow-inner" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reminder"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-start space-x-2 space-y-0">

                                <FormControl>
                                    <Checkbox

                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="font-semibold text-base">
                                    Hatırlatma SMS{"'"}leri Gönderilsin.
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-base">Notlar</FormLabel>
                                <FormControl>
                                    <Textarea className="h-10 shadow-inner" {...field} />
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
    )
}
