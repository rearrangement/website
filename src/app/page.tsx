import { ArrowRight } from "lucide-react";
import HoverRadial from "@/components/HoverRadial";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <div
        className="fixed inset-0 min-h-screen"
        style={{
          backgroundColor: "#242423",
          backgroundSize: "90px 90px",
          backgroundImage:
            "linear-gradient(90deg, #292927 1px, transparent 0), linear-gradient(180deg, #292927 1px, transparent 0)",
          backgroundAttachment: "fixed",
          zIndex: -2,
        }}
      />
      <HoverRadial />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans"
        style={{
          color: "#e8eddfcb",
          zIndex: 1,
        }}
      >
        <Card className="w-87.5 rounded-lg shadow-sm border border-neutral-800 bg-[#292927] text-[#e8eddfcb]">
          <CardHeader>
            <CardTitle>dylan</CardTitle>
            <CardDescription className="text-neutral-400">
              hey there, i'm dylan! i'm a 14 year old developer who builds things for the web. i'm an avid typescript fanboy amongst other things.
            </CardDescription>
            <CardDescription className="text-neutral-400">
              i sometimes blog about some projects i make and other things that i do.
            </CardDescription>
            <CardDescription className="text-neutral-200">
              {/* quick disclaimer for anyone still here, the following lines 44-50 were ai generated!!! */}
              <a href="/contact" className="group inline-flex items-center">
                <span className="relative">
                  get in touch!
                  <span className="absolute left-0 -bottom-0.5 w-full h-px bg-neutral-200 origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 will-change-transform" />
                </span>
                <ArrowRight className="ml-1 w-4 h-4 opacity-0 -translate-x-2 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 will-change-transform" />
              </a>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
