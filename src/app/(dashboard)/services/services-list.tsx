import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Service = {
  name: string;
  duration: string;
  price: string;
};

export default function ServicesList() {
  // Dummy data for services with 30 additional entries
  const services: Service[] = [
    { name: "Saç Kesimi", duration: "60dk", price: "400₺" },
    { name: "Saç Boyama", duration: "90dk", price: "500₺" },
    { name: "Manikür", duration: "45dk", price: "200₺" },
    { name: "Pedikür", duration: "60dk", price: "250₺" },
    { name: "Yüz Masajı", duration: "30dk", price: "150₺" },
    { name: "Saç Dalgası", duration: "50dk", price: "350₺" },
    { name: "Kaş Alma", duration: "20dk", price: "100₺" },
    { name: "Cilt Bakımı", duration: "75dk", price: "450₺" },
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

      <TableBody className="">
        {services.map((service, index) => (
          <TableRow key={index}>
            <TableCell>{service.name}</TableCell>
            <TableCell>{service.duration}</TableCell>
            <TableCell>{service.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
