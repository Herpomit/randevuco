"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useServiceStore } from "@/stores/useServiceStore";
import useUserDataStore from "@/stores/useUserDataStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ServicesList() {
  const { fetchServices, services, setSelectedService } = useServiceStore();
  const { userData } = useUserDataStore();

  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function fetchData() {
      if (userData?.companyUuid) {
        await fetchServices(userData.companyUuid);
      }
    }
    fetchData();
  }, [fetchServices, userData]);

  if (userData?.companyUuid === null) return <p>Lütfen Şirket bilgilerinizi giriniz!</p>;

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hizmet Adı</TableHead>
            <TableHead>Süresi (dk.)</TableHead>
            <TableHead>Hizmet Fiyatı (₺)</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <ScrollArea className="h-[20rem] w-full">
        <Table>
          <TableBody>
            {services.length > 0 ? (
              services.map((service, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    setSelectedServiceId(index);
                    setSelectedService(service);
                  }}
                  className={`cursor-pointer hover:bg-gray-100 ${selectedServiceId === index ? "bg-muted" : ""
                    }`}
                >
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>{service.price}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>Hizmet bulunamadı</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

