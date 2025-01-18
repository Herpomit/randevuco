"use client";
import { useState } from "react";
import { LucideIcon } from "lucide-react";
import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleButtonClick = (title: string) => {
    setActiveItem(title);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <Link href={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={activeItem === item.title}
                  onClick={() => handleButtonClick(item.title)}
                >
                  <div className="pr-2">
                    {item.icon && <item.icon className="w-5 h-5" />}
                  </div>

                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
