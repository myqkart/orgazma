import React from "react";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "accent" | "glass";
  className?: string;
}

export function Pill({
  children,
  variant = "default",
  className = "",
  ...props
}: PillProps) {
  let styleClasses = "";

  if (variant === "accent") {
    styleClasses =
      "bg-[#702442]/50 border-[#C66B91]/40 text-[#F8EDF2] shadow-[0_0_15px_rgba(198,107,145,0.2)]";
  } else if (variant === "glass") {
    styleClasses =
      "bg-black/30 backdrop-blur-md border-white/10 text-[#F8EDF2]/90";
  } else {
    styleClasses =
      "bg-[#1C101A]/80 backdrop-blur-md border-[#C66B91]/25 text-[#C66B91]";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-sans font-medium tracking-[0.08em] uppercase select-none transition-all duration-200 ${styleClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
