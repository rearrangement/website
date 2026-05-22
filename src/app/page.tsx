import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import TypedTitle from "@/components/TypedTitle";

export default function Home() {
  return (
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans"
        style={{
          color: "#e8eddfcb",
          zIndex: 1,
        }}
      >

      <Card className="w-87.5 rounded-xl shadow-sm bg-[#292927] text-[#e8eddfcb]">
        <CardHeader>
          <CardTitle>👋 <TypedTitle /></CardTitle>
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
            <a href="/projects" className="inline-flex items-center contact-link-fx relative z-50">
              <span className="relative">
                check out some of my projects!
                <span className="contact-underline" />
              </span>
              <ArrowRight className="contact-arrow" />
            </a>
            <a href="/blog" className="inline-flex items-center contact-link-fx relative z-50">
              <span className="relative">
                read my blog!
                <span className="contact-underline" />
              </span>
              <ArrowRight className="contact-arrow" />
            </a>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
