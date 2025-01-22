import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";



export default function UpgradePlan() {

    return (
        <>
            <Link href="/plans" className="w-full ">
                <Button className="bg-[#6857f6] text-white hover:bg-[#5648C9] text-base w-full">
                    <Sparkles className="w-12 h-12" /> Planı Yükselt</Button>
            </Link>
        </>
    )
}