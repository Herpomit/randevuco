"use client";
import PageContainer from "@/components/dashboard/pages/page-container";
import DashboardCard from "@/components/dashboard/cards/dashboard-card";
// import { useState } from "react";
import { CirclePlus, List } from "lucide-react";

import CustomerList, { Customer } from "./customer-list";
import ModalContainer from "@/components/modals/modal-container";
import CustomerDetails from "./customer-details";
import { CustomerAddForm } from "./customer-add-form";
import { useState } from "react";


export default function CustomerContainer() {
    //   const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    //     null
    //   );

    const [isModalOpen, setIsModalOpen] = useState(false);

    const customers: Customer[] = [
        { name: "Serdar Tezcan", phone: "0555 555 55 55" },
        { name: "Osman Gültekin", phone: "0555 555 55 55" },
        { name: "Ezel Evcil", phone: "0555 555 55 55" },
        { name: "Kaan Çetin", phone: "0555 555 55 55" },
        { name: "Umut Kaya", phone: "0555 555 55 55" },
        { name: "Serhat Kaya", phone: "0555 555 55 55" },
        { name: "Beyza Kaya", phone: "0555 555 55 55" },
    ];

    //   const handleCustomerSelect = (customer: Customer) => {
    //     setSelectedCustomer(customer);
    //   };
    return (
        <>
            <PageContainer title="Personel">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 pt-2">
                    <DashboardCard
                        icon={<List />}
                        title="Müşteri Listesi"
                        elements={
                            <>
                                <ModalContainer
                                    button={
                                        <div className="flex items-center gap-2 bg-[#6857f6] text-white hover:bg-[#5648C9] p-2 rounded-lg">
                                            <CirclePlus className="w-4 h-4" /> Müşteri Ekle
                                        </div>
                                    }
                                    triggerClass="text-black"
                                    contentClass="max-w-xs md:max-w-xl lg:max-w-xl"
                                    title={
                                        <p className="flex items-center gap-2 ">
                                            <CirclePlus className="" /> Yeni Müşteri Ekle
                                        </p>
                                    }
                                    isOpen={isModalOpen}
                                    setOpen={setIsModalOpen}
                                >

                                    <CustomerAddForm setIsModalOpen={setIsModalOpen} />
                                </ModalContainer>
                            </>
                        }
                    >
                        <CustomerList
                            customers={customers}
                            onCustomerSelect={() => {
                                // handleCustomerSelect
                            }}
                        />
                    </DashboardCard>

                    <CustomerDetails />

                </div>
            </PageContainer>
        </>
    );
}
