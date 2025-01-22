import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";


type Props = {
    deleteFunc: () => Promise<void>;
};

export default function DeleteForm({ deleteFunc }: Props) {
    return (
        <>
            <div className="w-full h-full">
                <div className="flex flex-col items-center justify-center py-4 px-4">
                    <div className="rounded-full bg-muted p-6 mb-4">
                        <Trash2 className="w-24 h-24 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                        Öğe Silinecek
                    </h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                        Silmek istediğinize emin misiniz?
                    </p>
                </div>
                <div className=" flex items-center justify-center gap-2">
                    <Button
                        className="bg-red-500 text-white hover:bg-red-700 text-base w-full "
                        type="button"
                        onClick={deleteFunc}
                    >
                        <Trash2 />
                        Sil
                    </Button>
                </div>
            </div>
        </>
    );
}
