import { fetchServices } from "@/app/(dashboard)/services/services-action";
import ServiceType from "@/backend/interfaces/service-type";
import { create } from "zustand";

interface ServiceStore {
    services: ServiceType[];
    fetchServices: (companyUuid: string, forceFetch?: boolean) => Promise<void>;
    timeStamp: number;
    selectedService: ServiceType | null;
    setSelectedService: (service: ServiceType | null) => void;
    clearSelectedService: () => void;
}

export const useServiceStore = create<ServiceStore>((set, get) => ({
    services: [],
    timeStamp: 0,
    selectedService: null,
    setSelectedService: (service: ServiceType | null) => set({ selectedService: service }),
    clearSelectedService: () => set({ selectedService: null }),
    fetchServices: async (companyUuid: string, forceFetch?: boolean) => {
        const timeStamp = Date.now();
        const shouldFetch = forceFetch || timeStamp - get().timeStamp > 300000; // 300,000 ms = 5 dakika
        if (shouldFetch) {
            const services = await fetchServices(companyUuid);
            console.log(services);
            set({ services: services.data, timeStamp });
        } else {
            set({ timeStamp });
        }
    },
}));
