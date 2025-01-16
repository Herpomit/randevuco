"use client";
import { ConditionalSidebar } from "@/components/dashboard/sidebar/conditional-sidebar";

import { ThemeProvider } from "@/components/light-dark-toggle/theme-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ConditionalSidebar>{children}</ConditionalSidebar>
    </ThemeProvider>
  );
}
