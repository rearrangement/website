"use client";

import { useEffect, useRef } from "react";
import styles from "./HoverRadial.module.css";

export default function HoverRadial() {
    const radial = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!radial.current) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            if (!radial.current) return;

            radial.current.style.setProperty("--x", `${e.clientX}px`);
            radial.current.style.setProperty("--y", `${e.clientY}px`);
        };
        
        window.addEventListener("mousemove", handleMouseMove);
        
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return <div ref={radial} className={styles.radial}></div>;
}
