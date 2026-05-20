"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" className="rounded-full text-white hover:bg-white/10 hover:text-white">
            Home
          </Button>
        </Link>
        <Link href="/projects">
          <Button variant="ghost" className="rounded-full text-white hover:bg-white/10 hover:text-white">
            Projects
          </Button>
        </Link>
        <Link href="/blog">
          <Button variant="ghost" className="rounded-full text-white hover:bg-white/10 hover:text-white">
            Blog
          </Button>
        </Link>
        <Link href="/contact">
          <Button variant="default" className="rounded-full bg-white text-black hover:bg-zinc-200">
            Contact
          </Button>
        </Link>
      </div>
    </nav>
  );
}
