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
      "bg-primary/25 border-primary/40 text-primary";
  } else if (variant === "glass") {
    styleClasses =
      "bg-black/45 backdrop-blur-md border-white/15 text-foreground/90";
  } else {
    styleClasses =
      "bg-surface/80 backdrop-blur-md border-primary/25 text-primary";
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-sans font-medium tracking-[0.1em] uppercase select-none ${styleClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
