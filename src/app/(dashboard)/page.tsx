"use client";

import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import trLocale from "@fullcalendar/core/locales/tr";
import { EventContentArg } from "@fullcalendar/core";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { ThemeToggle } from "@/components/light-dark-toggle/light-dark-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  allDay?: boolean;
}

export default function Page() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      title: "Saç Kesimi - Ahmet",
      start: "2025-01-17T10:00:00",
      end: "2024-01-17T10:10:00",
      backgroundColor: "#E5FE54",
      textColor: "#000000",
      borderColor: "#E5FE54",
    },
    {
      title: "Saç Boyama - Ayşe",
      start: "2025-01-17T14:30:00",
      end: "2024-01-17T16:00:00",
      backgroundColor: "#E5FE54",
      textColor: "#000000",
      borderColor: "#E5FE54",
    },
    {
      title: "Manikür - Zeynep",
      start: "2025-01-18T09:00:00",
      end: "2024-01-18T10:00:00",
      backgroundColor: "#E5FE54",
      textColor: "#000000",
      borderColor: "#E5FE54",
    },
  ]);

  const calendarRef = useRef<FullCalendar | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    const title = prompt("Randevu detaylarını girin:");
    if (title) {
      const newEvent: CalendarEvent = {
        title,
        start: arg.date.toISOString(),
        end: new Date(arg.date.getTime() + 60 * 60 * 10).toISOString(), // 1 saat süre
        backgroundColor: "#E5FE54",
        textColor: "#000000",
        borderColor: "#E5FE54",
        allDay: arg.allDay,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between gap-2 px-4 bg-muted w-full p-2 mx-4 rounded-lg">
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Randevu Takvimi
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-white hover:bg-gray-100"
                onClick={() => {
                  const calendarApi = calendarRef.current?.getApi();
                  calendarApi?.today();
                }}
              >
                Bugün
              </Button>
              <Button
                className="bg-[#6857f6] text-white hover:bg-[#5648C9]"
                onClick={() => {
                  const now = new Date();
                  handleDateClick({
                    date: now,
                    allDay: false,
                  } as DateClickArg);
                }}
              >
                Yeni Randevu
              </Button>
            </div>
            <ThemeToggle />
            <SidebarTrigger className=" flex md:hidden" />
          </div>
        </div>
      </header>
      <div className=" p-4 pt-0">
        <div className="rounded-xl  bg-white ">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "timeGridWeek,timeGridDay,gridMonth",
            }}
            events={events}
            eventContent={renderEventContent}
            dateClick={handleDateClick}
            height="1000px"
            locale={trLocale}
            allDaySlot={false}
            slotMinTime="09:00:00"
            slotMaxTime="21:00:00"
            expandRows={true}
            stickyHeaderDates={true}
            dayHeaderFormat={{
              weekday: "long",
              day: "numeric",
              month: "long",
            }}
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            slotDuration="00:30:00"
            businessHours={{
              daysOfWeek: [1, 2, 3, 4, 5, 6],
              startTime: "09:00",
              endTime: "21:00",
            }}
            nowIndicator={true}
            eventClassNames="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className="p-1 text-base">
      <div className="font-semibold">{eventInfo.timeText}</div>
      <div>{eventInfo.event.title}</div>
    </div>
  );
}
