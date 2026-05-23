import Link from "next/link";
import { 
    Card, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "./ui/card";

export default function RenderCard(title: string, desc: string, message: string = "important", link: string = "#") {
    return (
        <Link href={link} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <Card className="w-full h-full rounded-xl shadow-sm bg-[#292927] hover:bg-[#323230] transition-colors text-[#e8eddf]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-neutral-400">
                        {desc}
                    </CardDescription>
                    <div className="mt-4 pt-4 border-t border-neutral-700 text-sm text-neutral-400">
                        {message}
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
}