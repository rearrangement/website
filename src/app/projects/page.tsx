import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RenderCard from "@/components/RenderCard";


export default function Projects() {
    return (
        <div className="grid grid-cols-1 md-grid-cols-2">
            {RenderCard("wisest.cc", "my personal website, built with next.js and tailwind css, and hosted on vercel", "check out the source code on github!", "https://github.com/mostwise/website/tree/v6")}
        </div>
    )
}