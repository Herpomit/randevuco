"use client";
import PageContainer from "@/components/dashboard/pages/page-container";
import DashboardCard from "@/components/dashboard/cards/dashboard-card";
import { useState } from "react";
import { CirclePlus, List } from "lucide-react";

import ServicesList, { Service } from "./services-list";
import ModalContainer from "@/components/modals/modal-container";
import { AddServiceForm } from "./add-service-form";
import { EditServiceForm } from "./edit-service-form";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    { name: "Saç Kesimi", duration: "60dk", price: "400₺" },
    { name: "Saç Boyama", duration: "90dk", price: "500₺" },
    { name: "Manikür", duration: "45dk", price: "200₺" },
    { name: "Pedikür", duration: "60dk", price: "250₺" },
    { name: "Yüz Masajı", duration: "30dk", price: "150₺" },
    { name: "Saç Dalgası", duration: "50dk", price: "350₺" },
    { name: "Kaş Alma", duration: "20dk", price: "100₺" },
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };
  return (
    <>
      <PageContainer title="Hizmetler">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 pt-2">
          <DashboardCard
            icon={<List />}
            title="Hizmet Listesi"
            elements={
              <>
                <ModalContainer
                  button={
                    <div className="flex items-center gap-2 bg-[#6857f6] text-white hover:bg-[#5648C9] p-2 rounded-lg">
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
                >
                  <AddServiceForm />
                </ModalContainer>
              </>
            }
          >
            <ServicesList
              services={services}
              onServiceSelect={handleServiceSelect}
            />
          </DashboardCard>
          <DashboardCard icon={<List />} title="Hizmet Düzenle">
            <EditServiceForm selectedService={selectedService} />
          </DashboardCard>
        </div>
      </PageContainer>
    </>
  );
}
