import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import HoverRadial from "@/components/HoverRadial";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wise (dylan)",
  description: "my personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

      <html
        lang="en"
        className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      >
      
      <body className="min-h-full flex flex-col pt-24">
        <Navbar />
        {children}
      </body>
    </html>
  </>
  );
}