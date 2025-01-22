import ServiceType from "./service-type";

interface EmployeeType {
    uuid?: string;
    name: string;
    phone: string;
    color: string;
    companyUuid: string;
    services?: ServiceType[];
}
