import { LucideHouse } from "lucide-react";
import { LucideHammer } from "lucide-react";
import { LucideNewspaper } from "lucide-react";
import { LucideEye } from "lucide-react";
import { Card } from "./ui/card";
import { getGitCommitHash, getVersion } from "@/lib/version";

export default function Navbar() {
    const commit = getGitCommitHash();
    const version = getVersion();
    return (
        <nav className="pb-4 pr-4 pl-2 text-white w-1/5 flex flex-col h-full border-r border-gray-400 items-left">
            <Card className="flex flex-col justify-end items-center min-h-[100px] gap-1 mb-4 py-2">
                <a href="https://github.com/mostwise/website"><LucideEye className="w-12 h-12" /></a>
                <h1 className="text-lg font-bold text-black mb-2">wisest.cc</h1>
                <a className="text-xs underlined" href={`https://github.com/mostwise/website/commits/v6/${commit}`}>v{version}-{commit}</a>
            </Card>
            <a href="/" className="flex items-center gap-2 py-1 px-3 hover:bg-gray-200 rounded text-black text-sm"><LucideHouse className="w-4 h-4" />Home</a>
            <a href="/projects" className="flex items-center gap-2 py-1 px-3 hover:bg-gray-200 rounded text-black text-sm"><LucideHammer className="w-4 h-4" />Projects</a>
            <a href="https://blog.shxrk.dev" className="flex items-center gap-2 py-1 px-3 hover:bg-gray-200 rounded text-black text-sm"><LucideNewspaper className="w-4 h-4" />Blog</a>
        </nav>
    );
}