"use client";

import { useEffect, useRef } from "react";
import styles from "./HoverRadial.module.css";

export default function HoverRadial() {
    const radial = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!radial.current) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            if (!radial.current) return;

            // 5-20-26: see git commit,
            // changed the --x and --y radial to be global for use in card effect aswell
            // nevermind, i'm not implementing this but whatever
            const x = `${e.clientX}px`;
            const y = `${e.clientY}px`;

            radial.current.style.setProperty("--x", x);
            radial.current.style.setProperty("--y", y);
            
            document.documentElement.style.setProperty("--mouse-x", x);
            document.documentElement.style.setProperty("--mouse-y", y);
        };
        
        window.addEventListener("mousemove", handleMouseMove);
        
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return <div ref={radial} className={styles.radial}></div>;
}
