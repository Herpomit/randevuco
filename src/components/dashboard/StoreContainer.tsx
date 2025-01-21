"use client";

import useUserDataStore from "@/stores/useUserDataStore";
import { useEffect } from "react";


type StoreContainerProps = {
    children: React.ReactNode;
};

export default function CookieContainer({ children }: StoreContainerProps) {
    const { fetchUserData } = useUserDataStore();
    useEffect(() => {
        async function fetchData() {
            await fetchUserData();
        }

        fetchData();
    }, [fetchUserData]);

    return (
        <>
            {children}
        </>
    );
}