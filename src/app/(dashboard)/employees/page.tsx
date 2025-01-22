import PageContainer from "@/components/dashboard/pages/page-container";
import EmployeeContainer from "./employee-container";

export default function EmployeesPage() {

  return (
    <>
      <PageContainer title="Personel">
        <EmployeeContainer />
      </PageContainer>
    </>
  );
}
