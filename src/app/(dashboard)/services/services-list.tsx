"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ModalContainer from "@/components/modals/modal-container";
import { Ellipsis, Pencil, PenSquare, Trash } from "lucide-react";
import { EditServiceForm } from "./edit-service-form";

type Service = {
  name: string;
  duration: string;
  price: string;
};

export default function ServicesList() {
  const services: Service[] = [
    { name: "Saç Kesimi", duration: "60dk", price: "400₺" },
    { name: "Saç Boyama", duration: "90dk", price: "500₺" },
    { name: "Manikür", duration: "45dk", price: "200₺" },
    { name: "Pedikür", duration: "60dk", price: "250₺" },
    { name: "Yüz Masajı", duration: "30dk", price: "150₺" },
    { name: "Saç Dalgası", duration: "50dk", price: "350₺" },
    { name: "Kaş Alma", duration: "20dk", price: "100₺" },
  ];

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
          <TableRow key={index}>
            <TableCell>{service.name}</TableCell>
            <TableCell>{service.duration}</TableCell>
            <TableCell>{service.price}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the dropdown from closing
                      e.preventDefault(); // Prevent any default behavior
                    }}
                  >
                    <ModalContainer
                      button={
                        <p className="flex items-center gap-2 ">
                          <Pencil className="w-4 h-4" /> Düzenle
                        </p>
                      }
                      triggerClass="text-black"
                      contentClass="max-w-xs md:max-w-xl lg:max-w-xl"
                      title={
                        <p className="flex items-center gap-2 ">
                          <PenSquare className="" /> Hizmet Düzenle
                        </p>
                      }
                    >
                      <EditServiceForm />
                    </ModalContainer>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the dropdown from closing
                      e.preventDefault(); // Prevent any default behavior
                    }}
                  >
                    {" "}
                    <ModalContainer
                      button={
                        <p className="flex items-center gap-2 ">
                          <Trash className="w-4 h-4" /> Sil
                        </p>
                      }
                      triggerClass="text-black"
                      contentClass="max-w-xs md:max-w-xl lg:max-w-2xl"
                      title="Sil"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Minus quibusdam maxime dolore maiores voluptas sapiente
                      repellat officiis! Inventore numquam sed incidunt animi
                      beatae et. Est officia nam eum sed eligendi.
                    </ModalContainer>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
