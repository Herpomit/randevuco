"use client";

import * as React from "react";
import {
  CalendarDays,
  ChartSpline,
  CircleUserRound,
  GalleryVerticalEnd,
  NotebookText,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import UpgradePlan from "./upgrade-plan";

// This is sample data.
const data = {
  user: {
    name: "Ezca Software",
    email: "Veysel Ezelhan Evcil",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "RandevuCo",
      logo: GalleryVerticalEnd,
      plan: "User Dashboard",
    },
  ],
  navMain: [
    {
      title: "Randevularım",
      url: "/",
      icon: CalendarDays,
    },
    // {
    //   title: "Online Mağaza",
    //   url: "/online-shop",
    //   icon: Store,
    // },
    {
      title: "Hizmetler",
      url: "/services",
      icon: NotebookText,
    },
    {
      title: "Müşteriler",
      url: "/customers",
      icon: CircleUserRound,
    },
    {
      title: "Personel",
      url: "/employees",
      icon: Users,
    },
    // {
    //   title: "Kasa",
    //   url: "/case",
    //   icon: Lock,
    // },
    {
      title: "Performans",
      url: "/performance",
      icon: ChartSpline,
    },

  ],
  navDropdown: [
    {
      title: "Ayarlar",
      url: "/settings",
      icon: Settings,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UpgradePlan />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
