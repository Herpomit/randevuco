import { ConditionalSidebar } from "@/components/dashboard/sidebar/conditional-sidebar";
import StoreContainer from "@/components/dashboard/StoreContainer";

import { ThemeProvider } from "@/components/light-dark-toggle/theme-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ConditionalSidebar>
        <StoreContainer>{children}</StoreContainer>
      </ConditionalSidebar>
    </ThemeProvider>
  );
}
