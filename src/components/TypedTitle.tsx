"use client";

import { useEffect, useRef } from "react";
import Typed from "@/lib/typed.js";

export default function TypedTitle() {
  const element = useRef(null);

  useEffect(() => {
    const typed = new Typed(element.current, {
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
      typed.destroy();
    };
  }, []);

  return <span ref={element}></span>;
}
