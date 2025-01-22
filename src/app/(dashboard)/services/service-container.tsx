"use client";

import DashboardCard from "@/components/dashboard/cards/dashboard-card";
import ModalContainer from "@/components/modals/modal-container";
import { CirclePlus, List } from "lucide-react";
import { useState } from "react";
import { AddServiceForm } from "./add-service-form";
import ServicesList from "./services-list";
import { EditServiceForm } from "./edit-service-form";


export default function ServiceContainer() {
    const [open, setOpen] = useState(false);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 pt-2">
            <DashboardCard
                icon={<List />}
                title="Hizmet Listesi"
                elements={
                    <>
                        <ModalContainer
                            button={
                                <div onClick={() => setOpen(true)} className="flex items-center gap-2 bg-[#6857f6] text-white hover:bg-[#5648C9] p-2 rounded-lg">
                                    <CirclePlus className="w-4 h-4" /> Yeni Hizmet Ekle
                                </div>
                            }
                            triggerClass="text-black"
                            contentClass="max-w-xs md:max-w-xl lg:max-w-xl"
                            title={
                                <p className="flex items-center gap-2 ">
                                    <CirclePlus className="" /> Yeni Hizmet Ekle
                                </p>
                            }
                            isOpen={open}
                            setOpen={setOpen} // Modal kapatma fonksiyonunu ekledik

                        >
                            {/* ModalContainer'ın onClose işlevini AddServiceForm'a gönderiyoruz */}

                            <AddServiceForm setOpen={setOpen} />

                        </ModalContainer>
                    </>
                }
            >
                <ServicesList />
            </DashboardCard>
            <DashboardCard icon={<List />} title="Hizmet Düzenle">
                <EditServiceForm />
            </DashboardCard>
        </div>
    );
};