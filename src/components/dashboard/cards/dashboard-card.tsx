"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

type DashboardCardProps = {
  icon: ReactNode; // Change this to accept ReactNode for the icon element
  title: string;
  children: ReactNode;
  elements?: ReactNode;
  className?: string;
};

export default function DashboardCard({
  children,
  className,
  title,
  elements,
  icon,
}: DashboardCardProps) {
  return (
    <Card className={`shadow-inner ${className}`}>
      <div className="flex items-center justify-between bg-muted rounded-t-xl  pr-4">
        <div className="flex items-center space-x-2 justify-start  p-4">
          {icon} {/* Render the icon directly as a React element */}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <div>{elements}</div>
      </div>

      <CardContent className="p-2">{children}</CardContent>
    </Card>
  );
}
