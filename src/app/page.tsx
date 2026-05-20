"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import HoverRadial from "@/components/HoverRadial";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typed from "@/lib/typed.js";

export default function Home() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "hello there",
        "buenos dias",
        "tu es beau (ou mignon)",
        "dzien dobry",
        "du riechst gut",
        "assalamualaikum"
      ],
      typeSpeed: 70,
      backSpeed: 50,
      loop: true
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

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
        <Card className="w-87.5 rounded-xl shadow-sm bg-[#292927] text-[#e8eddfcb]">
          <CardHeader>
            <CardTitle>👋 <span ref={el}></span></CardTitle>
            <CardDescription className="text-neutral-400">
              i'm dylan (aka wise), a 14 year old developer who builds things for the web. i'm an avid typescript fanboy amongst other things.
            </CardDescription>
            <CardDescription className="text-neutral-400">
              i sometimes blog about some projects i make and other things that i do.
            </CardDescription>
            <CardDescription className="text-neutral-200">
              {/* quick disclaimer for anyone still here, the following lines 43-49 were ai generated!!! */}
              <a href="/contact" className="inline-flex items-center contact-link-fx relative z-50">
                <span className="relative">
                  get in touch!
                  <span className="contact-underline" />
                </span>
                <ArrowRight className="contact-arrow" />
              </a>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
