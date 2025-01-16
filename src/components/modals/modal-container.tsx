import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type ModalProps = {
    button: string;
    title: string;
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
                className={`rounded-lg p-6 bg-white shadow-lg max-w-lg w-full mx-auto ${contentClass}`}

            >

                <div className=" -mt-3">
                    <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
                    <DialogDescription className="">{description}</DialogDescription>
                </div>


                <div>{children}</div>
            </DialogContent >
        </Dialog >
    );
}
