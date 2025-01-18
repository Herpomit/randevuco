interface ServiceType {
    uuid?: string;
    name: string;
    price: number; // Number type for proper calculations
    duration: number; // Duration in minutes
    showOnline?: boolean;
    acceptPayment?: boolean;
    paymentType?: "full" | "partial";
    partialAmount?: number;
}

export default ServiceType;