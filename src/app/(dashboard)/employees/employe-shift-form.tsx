import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import useEmployeeStore from "@/stores/useEmployeeStore";
import { getWorkSchedule, updateWorkSchedule } from "./employee-actions";
import { toast } from "@/hooks/use-toast";

interface WorkDay {
  uuid: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface WorkSchedule {
  [key: string]: WorkDay;
}

export default function EmployeeShiftForm() {
  const { selectedEmployee } = useEmployeeStore();
  const [schedule, setSchedule] = React.useState<WorkSchedule>({
    pazartesi: { uuid: "", enabled: true, startTime: "09:00", endTime: "23:00" },
    sali: { uuid: "", enabled: true, startTime: "09:00", endTime: "23:00" },
    carsamba: { uuid: "", enabled: true, startTime: "09:00", endTime: "23:00" },
    persembe: { uuid: "", enabled: true, startTime: "09:00", endTime: "23:00" },
    cuma: { uuid: "", enabled: true, startTime: "09:00", endTime: "23:00" },
    cumartesi: { uuid: "", enabled: true, startTime: "09:00", endTime: "23:00" },
    pazar: { uuid: "", enabled: false, startTime: "09:00", endTime: "23:00" },
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedEmployee) {
      setError("Personel seçilmedi. Lütfen bir personel seçin.");
      setLoading(false);
      return;
    }

    async function fetchWorkSchedule() {
      setLoading(true);
      setError(null);
      try {
        const response = await getWorkSchedule(selectedEmployee!.uuid!);
        if (response.status) {
          const workSchedules = response.data;
          const updatedSchedule: WorkSchedule = {};

          workSchedules.forEach((workDay: any) => {
            updatedSchedule[workDay.day] = {
              uuid: workDay.uuid,
              enabled: workDay.isWorking === true,
              startTime: workDay.startTime || "09:00",
              endTime: workDay.endTime || "18:00",
            };
          });

          setSchedule(updatedSchedule);
        } else {
          setError("Çalışma saatleri yüklenemedi.");
        }
      } catch (err) {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkSchedule();
  }, [selectedEmployee]);

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

  const handleSubmit = async () => {
    if (!selectedEmployee) {
      setError("Personel seçilmedi. Lütfen bir personel seçin.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Schedule'i API için uygun formata dönüştür
      const updatedSchedules = Object.entries(schedule).map(([day, data]) => ({
        uuid: data.uuid, // UUID artık mevcut
        employeeUuid: selectedEmployee.uuid!,
        day,
        startTime: data.startTime,
        endTime: data.endTime,
        isWorking: data.enabled,
      }));

      const response = await updateWorkSchedule(updatedSchedules);

      if (!response.status) {
        setError(response.message || "Güncelleme sırasında bir hata oluştu.");
        toast({
          title: "Çalışma saatlerini guçellendi.",
          description: "Personel saati guçellendi.",
          variant: "success",
        })
      } else {
        toast({
          title: "Çalışma saatlerini guçellendi.",
          description: "Personel saati guçellendi.",
          variant: "success",
        })
      }
    } catch (err) {
      setError("Çalışma saatlerini güncellerken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {Object.entries(days).map(([key, label]) => (
        <div
          key={key}
          className="flex items-center gap-4 flex-wrap sm:flex-nowrap pr-2"
        >
          <div className="w-20">
            <Label>{label}</Label>
          </div>
          <Switch
            checked={schedule[key].enabled}
            onCheckedChange={() => handleToggleDay(key)}
          />
          <div className="flex items-center gap-2 flex-1">
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
              onChange={(e) =>
                handleTimeChange(key, "endTime", e.target.value)
              }
              disabled={!schedule[key].enabled}
              className="w-22"
            />
          </div>
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        className="bg-[#6857f6] text-white hover:bg-[#5648C9] text-base w-full"
        type="submit"
      >
        <RefreshCw />
        Ayarları Güncelle
      </Button>
    </div>
  );
}
