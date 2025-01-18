"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Employee = {
  name: string;
  phone: string;
};

interface EmployeeListProps {
  employees: Employee[];
  onEmployeeSelect: (service: Employee) => void;
}

export default function EmployeeList({
  employees,
  onEmployeeSelect,
}: EmployeeListProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );

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
        {employees.map((service, index) => (
          <TableRow
            key={index}
            onClick={() => {
              onEmployeeSelect(service);
              setSelectedEmployeeId(index);
            }}
            className={`cursor-pointer hover:bg-gray-100 ${selectedEmployeeId === index ? "bg-muted" : ""
              }`}
          >

            <TableCell>{service.name}</TableCell>
            <TableCell>+90 (545) 545 45 45</TableCell>
            <TableCell>
              <div className=" bg-blue-400 h-6 w-6 rounded-full"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
