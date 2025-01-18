"use client";
import PageContainer from "@/components/dashboard/pages/page-container";
import DashboardCard from "@/components/dashboard/cards/dashboard-card";
// import { useState } from "react";
import { CirclePlus, List } from "lucide-react";

import EmployeeList, { Employee } from "./employee-list";
import ModalContainer from "@/components/modals/modal-container";
import EmployeeDetails from "./employe-details";

export default function EmployeesPage() {
  //   const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
  //     null
  //   );

  const employees: Employee[] = [
    { name: "Serdar Tezcan" },
    { name: "Osman Gültekin" },
    { name: "Ezel Evcil" },
    { name: "Kaan Çetin" },
    { name: "Umut Kaya" },
    { name: "Serhat Kaya" },
    { name: "Beyza Kaya" },
  ];

  //   const handleEmployeeSelect = (employee: Employee) => {
  //     setSelectedEmployee(employee);
  //   };
  return (
    <>
      <PageContainer title="Personel">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 pt-2">
          <DashboardCard
            icon={<List />}
            title="Personel Listesi"
            elements={
              <>
                <ModalContainer
                  button={
                    <div className="flex items-center gap-2 bg-[#6857f6] text-white hover:bg-[#5648C9] p-2 rounded-lg">
                      <CirclePlus className="w-4 h-4" /> Personel Ekle
                    </div>
                  }
                  triggerClass="text-black"
                  contentClass="max-w-xs md:max-w-xl lg:max-w-xl"
                  title={
                    <p className="flex items-center gap-2 ">
                      <CirclePlus className="" /> Yeni Hizmet Ekle
                    </p>
                  }
                >
                  dsds
                </ModalContainer>
              </>
            }
          >
            <EmployeeList
              employees={employees}
              onEmployeeSelect={() => {
                // handleEmployeeSelect
              }}
            />
          </DashboardCard>

          {/* <EditEmployeeForm selectedEmployee={selectedEmployee} /> */}
          <EmployeeDetails />
        </div>
      </PageContainer>
    </>
  );
}
