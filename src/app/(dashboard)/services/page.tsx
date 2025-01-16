import PageContainer from "@/components/dashboard/pages/page-container";
import DashboardCard from "@/components/dashboard/cards/dashboard-card";
import { CirclePlus, List } from "lucide-react";
import { AddServiceForm } from "./add-service-form";
import ServicesList from "./services-list";

export default function ServicesPage() {
  return (
    <>
      <PageContainer title="Hizmetler">
        <div className="grid grid-cols-[1fr_2fr] gap-4 pt-2">
          <DashboardCard icon={<CirclePlus />} title="Yeni Hizmet Ekle">
            <AddServiceForm />
          </DashboardCard>

          <DashboardCard icon={<List />} title="Hizmet Listesi">
            <ServicesList />
          </DashboardCard>
        </div>
      </PageContainer>
    </>
  );
}
