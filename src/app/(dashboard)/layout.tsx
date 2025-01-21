import { ConditionalSidebar } from "@/components/dashboard/sidebar/conditional-sidebar";
import CookieContainer from "@/components/dashboard/StoreContainer";

import { ThemeProvider } from "@/components/light-dark-toggle/theme-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ConditionalSidebar>
        <CookieContainer>{children}</CookieContainer>
      </ConditionalSidebar>
    </ThemeProvider>
  );
}
