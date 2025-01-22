import PageContainer from "@/components/dashboard/pages/page-container";
import ServiceContainer from "./service-container";

export default function ServicesPage() {
  return (
    <>
      <PageContainer title="Hizmetler">
        <ServiceContainer />
      </PageContainer>
    </>
  );
}
