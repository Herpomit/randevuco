// components/ConditionalSidebar.tsx
"use client";;
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function ConditionalSidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ].includes(pathname);


  return hideSidebar ? (
    <>{children}</>
  ) : (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
