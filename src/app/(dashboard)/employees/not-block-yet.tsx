import { CalendarX } from "lucide-react";

export default function NotBlockYet() {
  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="rounded-full bg-muted p-6 mb-4">
            <CalendarX className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Henüz Bloklama Bulunmuyor
          </h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Personel için bloklama eklemek için lütfen yeni bloklama oluşturun.
          </p>
        </div>
      </div>
    </>
  );
}
