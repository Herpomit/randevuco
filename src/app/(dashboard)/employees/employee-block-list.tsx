"use client";

// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { UserRoundX } from "lucide-react";
import NotBlockYet from "./not-block-yet";
import ModalContainer from "@/components/modals/modal-container";

export type EmployeeBlock = {
  name: string;
};

interface EmployeeBlockListProps {
  employeeBlocks: EmployeeBlock[];
  onEmployeeBlockSelect: (service: EmployeeBlock) => void;
}

export default function EmployeeBlockBlockList({}: //   employeeBlocks,
//   onEmployeeBlockSelect,
EmployeeBlockListProps) {
  //   const [selectedEmployeeBlockId, setSelectedEmployeeBlockId] = useState<
  //     number | null
  //   >(null);

  return (
    <>
      <div className="flex flex-col items-center justify-between w-full">
        <NotBlockYet />
        {/*  <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bloklama Tipi</TableHead>
              <TableHead>Başlangıç</TableHead>
              <TableHead>Bitiş</TableHead>
              <TableHead>Notlar</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
           
         {employeeBlocks.map((service, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  onEmployeeBlockSelect(service);
                  setSelectedEmployeeBlockId(index);
                }}
                className={`cursor-pointer hover:bg-gray-100 ${
                  selectedEmployeeBlockId === index ? "bg-muted" : ""
                }`}
              >
                <TableCell>{service.name}</TableCell>
                <TableCell>
                  <div className=" bg-blue-400 h-6 w-6 rounded-full"></div>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>*/}
        <ModalContainer
          button={
            <div className="text-base bg-black hover:bg-neutral-800 text-white flex items-center justify-center  py-1 h-9 rounded-lg w-96  bottom-0 ">
              <UserRoundX className="w-4 h-4 mr-2" />
              Personel Blokla
            </div>
          }
          title="Yeni Bloklama"
        >
          fdfd
        </ModalContainer>
      </div>
    </>
  );
}
{
  /* <div className="w-full h-full">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="rounded-full bg-muted p-6 mb-4">
            <CalendarX className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Henüz Bloklama Bulunmuyor
          </h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Personel için bloklama eklemek için lütfen yeni bloklama oluşturun.
          </p>
        </div>
      </div> */
}
