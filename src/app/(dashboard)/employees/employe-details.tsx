import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeEditForm } from "./employee-edit-form";
import EmployeeShiftForm from "./employe-shift-form";
import EmployeeBlockList from "./employee-block-list";
import { EmployeeType } from "@/backend/interfaces/employee-type";


export default function EmployeeDetails() {

  return (
    <>
      <Card>
        <Tabs defaultValue="employeeInfo" className="w-full h-full">
          <TabsList className="w-full h-[3.8rem] rounded-t-xl rounded-b-none bg-muted p-2 space-x-2">
            <TabsTrigger
              value="employeeInfo"
              className="w-full h-full text-xl font-semibold "
            >
              Peronel Bilgileri
            </TabsTrigger>
            <TabsTrigger
              value="workingTime"
              className="w-full h-full text-xl font-semibold"
            >
              Çalışma Saatleri
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="w-full h-full text-xl font-semibold"
            >
              Yetkiler
            </TabsTrigger>
          </TabsList>
          <TabsContent value="employeeInfo" className="p-2">
            <EmployeeEditForm />
          </TabsContent>
          <TabsContent
            value="workingTime"
            className="p-2 grid grid-cols-2 gap-4 "
          >
            <EmployeeShiftForm />
            <EmployeeBlockList
              employeeBlocks={[]}
              onEmployeeBlockSelect={() => { }}
            />
          </TabsContent>
          <TabsContent value="permissions">
            Change your fgfgfdfgfgdfg here.
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
}
