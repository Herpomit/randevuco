"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type DashboardCardProps = {
  icon: ReactNode; // Change this to accept ReactNode for the icon element
  title: string;
  children: ReactNode;
};

export default function DashboardCard({
  children,
  title,
  icon,
}: DashboardCardProps) {
  return (
    <Card className="shadow-inner">
      <div className="flex items-center space-x-2 justify-start bg-muted rounded-t-xl p-4">
        {icon} {/* Render the icon directly as a React element */}
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
      <CardContent className="p-2">{children}</CardContent>
    </Card>
  );
}
