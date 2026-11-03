import React from "react";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export function Pill({ children, className = "", ...props }: PillProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full bg-[#172235]/90 backdrop-blur-sm border border-[rgba(141,194,208,0.18)] text-[#8DC2D0] text-xs font-sans font-medium tracking-[0.08em] uppercase ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
