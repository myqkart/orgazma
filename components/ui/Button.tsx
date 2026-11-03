import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "min-h-10 px-4 py-2 text-xs tracking-wide",
    md: "min-h-11 sm:min-h-12 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base tracking-wide",
    lg: "min-h-12 sm:min-h-[3.25rem] px-6 sm:px-8 py-3 sm:py-3.5 text-[15px] sm:text-lg tracking-wide",
  }[size];

  const baseClasses =
    "group relative inline-flex items-center justify-center font-sans font-semibold rounded-full transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden touch-manipulation";

  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "bg-primary text-[#1a1408] border border-primary-hover/40 shadow-[0_12px_32px_rgba(230,179,90,0.28)] hover:bg-primary-hover hover:shadow-[0_16px_40px_rgba(230,179,90,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";
  } else if (variant === "glass") {
    variantClasses =
      "bg-white/[0.05] backdrop-blur-md text-foreground border border-white/12 hover:border-primary/45 hover:bg-primary/10 hover:text-primary active:scale-[0.98]";
  } else {
    variantClasses =
      "bg-transparent text-primary border border-primary/40 hover:bg-primary/10 hover:border-primary hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";
  }

  const classes = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type || "button"} className={classes} {...props}>
      {children}
    </button>
  );
}
