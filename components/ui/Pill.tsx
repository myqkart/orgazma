import React from "react";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className = "", ...props }: PillProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full bg-[#1C101A]/90 backdrop-blur-sm border border-[rgba(198,107,145,0.2)] text-[#C66B91] text-xs font-sans font-medium tracking-[0.08em] uppercase ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
