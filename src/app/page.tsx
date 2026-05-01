import Image from "next/image";
import HoverRadial from "@/components/HoverRadial";

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
        className="flex flex-col flex-1 items-center justify-center font-sans min-h-screen relative"
        style={{
          color: "#e8eddfcb",
          zIndex: 1,
        }}
      ></div>
    </>
  );
}
