import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

type ModalProps = {
  button: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  contentClass?: string;
  triggerClass?: string;
  isOpen: boolean; // Modal açık/kapalı durumunu kontrol etmek için
  setOpen: (isOpen: boolean) => void; // Modal durumu güncelleme işlevi
};

export default function ModalContainer({
  button,
  title,
  description,
  children,
  contentClass = "",
  triggerClass = "",
  isOpen,
  setOpen,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger className={triggerClass}>{button}</DialogTrigger>
      <DialogContent
        className={`rounded-lg p-6 shadow-lg max-w-lg w-full mx-auto ${contentClass}`}
      >
        <DialogHeader className=" -mt-3  ">
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="">{description}</DialogDescription>
          )}
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
