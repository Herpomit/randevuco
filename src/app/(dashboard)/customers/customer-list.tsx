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

export type Customer = {
    name: string;
    phone: string;
};

interface CustomerListProps {
    customers: Customer[];
    onCustomerSelect: (service: Customer) => void;
}

export default function CustomerList({
    customers,
    onCustomerSelect,
}: CustomerListProps) {
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
        null
    );

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Ad Soyad</TableHead>
                    <TableHead>Telefon</TableHead>

                </TableRow>
            </TableHeader>

            <TableBody>
                {customers.map((service, index) => (
                    <TableRow
                        key={index}
                        onClick={() => {
                            onCustomerSelect(service);
                            setSelectedCustomerId(index);
                        }}
                        className={`cursor-pointer hover:bg-gray-100 ${selectedCustomerId === index ? "bg-muted" : ""
                            }`}
                    >

                        <TableCell>{service.name}</TableCell>
                        <TableCell>+90 (545) 545 45 45</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
