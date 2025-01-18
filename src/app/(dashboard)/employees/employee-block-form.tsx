"use client";

import * as React from "react";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TimeSelect } from "./time-select";

interface BlockingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName?: string;
}

export function BlockingForm({
  open,
  onOpenChange,
  employeeName = "asa asa (Siz)",
}: BlockingFormProps) {
  const [blockType, setBlockType] = React.useState<"date" | "time">("date");
  const [isFullDay, setIsFullDay] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [startTime, setStartTime] = React.useState("09:00");
  const [endTime, setEndTime] = React.useState("17:00");
  const [notes, setNotes] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      blockType,
      isFullDay,
      startDate,
      endDate,
      startTime,
      endTime,
      notes,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{employeeName}: Yeni Bloklama</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="blockType">Bloklama Tipi</Label>
            <Select
              value={blockType}
              onValueChange={(value: "date" | "time") => setBlockType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Bloklama tipi seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Tarih</SelectItem>
                <SelectItem value="time">Saat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {blockType === "date" && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fullDay"
                checked={isFullDay}
                onCheckedChange={(checked) => setIsFullDay(checked as boolean)}
              />
              <Label htmlFor="fullDay">Tüm Günü Blokla</Label>
            </div>
          )}

          {blockType === "date" ? (
            <>
              <div className="space-y-2">
                <Label>Başlangıç Tarihi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate
                        ? format(startDate, "dd.MM.yyyy", { locale: tr })
                        : "Tarih seçin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Bitiş Tarihi</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate
                        ? format(endDate, "dd.MM.yyyy", { locale: tr })
                        : "Tarih seçin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label>Başlangıç Saati</Label>
                <TimeSelect value={startTime} onChange={setStartTime} />
              </div>

              <div className="space-y-2">
                <Label>Bitiş Saati</Label>
                <TimeSelect value={endTime} onChange={setEndTime} />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Notlar</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Bloklama hakkında notlar..."
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Bloklamayı Oluştur
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
