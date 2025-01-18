"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

interface WorkDay {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface WorkSchedule {
  [key: string]: WorkDay;
}

export default function EmployeeShiftForm() {
  const [schedule, setSchedule] = React.useState<WorkSchedule>({
    pazartesi: { enabled: true, startTime: "09:00", endTime: "23:00" },
    sali: { enabled: true, startTime: "09:00", endTime: "23:00" },
    carsamba: { enabled: true, startTime: "09:00", endTime: "23:00" },
    persembe: { enabled: true, startTime: "09:00", endTime: "23:00" },
    cuma: { enabled: true, startTime: "09:00", endTime: "23:00" },
    cumartesi: { enabled: true, startTime: "09:00", endTime: "23:00" },
    pazar: { enabled: false, startTime: "09:00", endTime: "23:00" },
  });

  const handleToggleDay = (day: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const handleTimeChange = (
    day: string,
    type: "startTime" | "endTime",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  };

  const handleSubmit = () => {
    console.log("Güncellenmiş çalışma saatleri:", schedule);
    // API call would go here
  };

  const days = {
    pazartesi: "Pazartesi",
    sali: "Salı",
    carsamba: "Çarşamba",
    persembe: "Perşembe",
    cuma: "Cuma",
    cumartesi: "Cumartesi",
    pazar: "Pazar",
  };

  return (
    <div className=" grid grid-cols-1 gap-4 ">
      {Object.entries(days).map(([key, label]) => (
        <div
          key={key}
          className="flex items-center  gap-4 flex-wrap sm:flex-nowrap  pr-2"
        >
          <div className="w-20 ">
            <Label>{label}</Label>
          </div>
          <Switch
            checked={schedule[key].enabled}
            onCheckedChange={() => handleToggleDay(key)}
          />
          <div className="flex items-center gap-2 flex-1    ">
            <Input
              type="time"
              value={schedule[key].startTime}
              onChange={(e) =>
                handleTimeChange(key, "startTime", e.target.value)
              }
              disabled={!schedule[key].enabled}
              className="w-22"
            />
            <span className="px-2">-</span>
            <Input
              type="time"
              value={schedule[key].endTime}
              onChange={(e) => handleTimeChange(key, "endTime", e.target.value)}
              disabled={!schedule[key].enabled}
              className="w-22"
            />
          </div>
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        className="bg-[#6857f6] text-white hover:bg-[#5648C9] text-base w-full "
        type="submit"
      >
        <RefreshCw />
        Ayarları Güncelle
      </Button>
    </div>
  );
}
