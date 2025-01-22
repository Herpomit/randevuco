import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useEmployeeStore from "@/stores/useEmployeeStore";
import useUserDataStore from "@/stores/useUserDataStore";
import { EmployeeType } from "@/backend/interfaces/employee-type";

export type Employee = {
  name: string;
  phone: string;
};

export default function EmployeeList() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const { userData } = useUserDataStore();
  const { fetchEmployees, employees, setSelectedEmployee } = useEmployeeStore();

  useEffect(() => {

    async function fetchData() {
      if (userData?.companyUuid) {
        await fetchEmployees(userData.companyUuid);
      }
    }

    fetchData();
  }, [fetchEmployees, userData]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ad Soyad</TableHead>
          <TableHead>Telefon</TableHead>
          <TableHead>Renk</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <TableRow
              key={index}
              onClick={() => {
                setSelectedEmployee(employee);
                setSelectedEmployeeId(index);
              }}
              className={`cursor-pointer hover:bg-gray-100 ${selectedEmployeeId === index ? "bg-muted" : ""
                }`}
            >

              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>
                <div style={{
                  backgroundColor: employee.color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                }}
                  title={employee.color} // Tooltip olarak renk kodunu göstermek için
                ></div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="h-24 text-center">
              Personel Bulunmuyor
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
