import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalProps = {
  button: React.ReactNode; // Updated to accept both string and icon
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  contentClass?: string;
  triggerClass?: string;
};

export default function ModalContainer({
  button,
  title,
  description,
  children,
  contentClass = "",
  triggerClass = "",
}: ModalProps) {
  return (
    <Dialog>
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
