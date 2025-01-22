"use client";;
import DashboardCard from "@/components/dashboard/cards/dashboard-card";
import ModalContainer from "@/components/modals/modal-container";
import { CirclePlus, List } from "lucide-react";
import { EmployeeAddForm } from "./employee-add-form";
import EmployeeList from "./employee-list";
import EmployeeDetails from "./employe-details";
import { useState } from "react";



export default function EmployeeContainer() {

    const [open, setOpen] = useState(false);

    return (
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
                                    <CirclePlus className="" /> Yeni Personel Ekle
                                </p>
                            }
                            isOpen={open}
                            setOpen={setOpen}
                        >
                            <EmployeeAddForm setOpen={setOpen} />
                        </ModalContainer>
                    </>
                }
            >
                <EmployeeList />
            </DashboardCard>

            {/* <EditEmployeeForm selectedEmployee={selectedEmployee} /> */}
            <EmployeeDetails />
        </div>
    );
}