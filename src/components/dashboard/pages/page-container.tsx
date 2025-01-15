import { ThemeToggle } from "@/components/light-dark-toggle/light-dark-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

type PageContainerProps = {
  title: string;
  children: React.ReactNode;
};

export default function PageContainer({ title, children }: PageContainerProps) {
  return (
    <>
      <div className="flex flex-col w-full">
        <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4 bg-muted w-full p-2 mx-4 rounded-lg">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-center gap-2">
              <ThemeToggle />
              <SidebarTrigger className=" flex md:hidden" />
            </div>
          </div>
        </header>
        <div className=" p-4 pt-0">{children}</div>
      </div>
    </>
  );
}
