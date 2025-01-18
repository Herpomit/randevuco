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

export type Service = {
  name: string;
  duration: string;
  price: string;
};

interface ServicesListProps {
  services: Service[];
  onServiceSelect: (service: Service) => void;
}

export default function ServicesList({
  services,
  onServiceSelect,
}: ServicesListProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Hizmet Adı</TableHead>
          <TableHead>Süresi (dk.)</TableHead>
          <TableHead>Hizmet Fiyatı (₺)</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {services.map((service, index) => (
          <TableRow
            key={index}
            onClick={() => {
              onServiceSelect(service);
              setSelectedServiceId(index);
            }}
            className={`cursor-pointer hover:bg-gray-100 ${
              selectedServiceId === index ? "bg-muted" : ""
            }`}
          >
            <TableCell>{service.name}</TableCell>
            <TableCell>{service.duration}</TableCell>
            <TableCell>{service.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
