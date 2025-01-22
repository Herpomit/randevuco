import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerEditForm } from "./customer-edit-form";


export default function CustomerDetails() {
    return (
        <>
            <Card>
                <Tabs defaultValue="customerInfo" className="w-full h-full">
                    <TabsList className="w-full h-[3.8rem] rounded-t-xl rounded-b-none bg-muted p-2 space-x-2">
                        <TabsTrigger
                            value="customerInfo"
                            className="w-full h-full text-xl font-semibold "
                        >
                            Müşteri Bilgileri
                        </TabsTrigger>
                        <TabsTrigger
                            value="customerAppo"
                            className="w-full h-full text-xl font-semibold"
                        >
                            Randevular
                        </TabsTrigger>

                    </TabsList>
                    <TabsContent value="customerInfo" className="p-2">
                        <CustomerEditForm />
                    </TabsContent>
                    <TabsContent
                        value="customerAppo"
                        className="p-2 grid grid-cols-2 gap-4 "
                    >
                        dsdsds

                    </TabsContent>

                </Tabs>
            </Card>
        </>
    );
}
