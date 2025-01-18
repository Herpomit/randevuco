import { getCookieData } from "@/backend/actions/cookie-actions";
import { create } from "zustand";

interface PayloadType {
    uuid: string;
    email: string;
    name: string;
    phone: string;
    isCompanyCreated: boolean;
    companyUuid: string;
}

interface UserStore {
    userData: PayloadType | null;
    fetchUserData: () => Promise<void>;
}

export const useUserDataStore = create<UserStore>((set) => ({
    userData: null,
    fetchUserData: async () => {
        const response = await getCookieData();
        if (response.status) {
            set({ userData: response.data });
        } else {
            set({ userData: null });
        }
    },
}));

export default useUserDataStore