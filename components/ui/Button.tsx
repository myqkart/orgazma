import React from "react";

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
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm sm:text-base",
    lg: "px-8 py-3.5 text-base sm:text-lg",
  }[size];

  const baseClasses =
    "group relative inline-flex items-center justify-center font-sans font-medium rounded-full transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden";

  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "bg-gradient-to-r from-[#702442] to-[#862F52] text-[#F8EDF2] border border-[#C66B91]/30 shadow-[0_10px_25px_rgba(112,36,66,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] hover:from-[#7C2B4B] hover:to-[#96375E] hover:shadow-[0_14px_35px_rgba(198,107,145,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";
  } else if (variant === "glass") {
    variantClasses =
      "bg-white/[0.04] backdrop-blur-md text-[#F8EDF2] border border-white/10 hover:border-[#C66B91]/50 hover:bg-[#C66B91]/10 hover:text-[#C66B91] hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] active:scale-[0.98]";
  } else {
    // ghost
    variantClasses =
      "bg-transparent text-[#C66B91] border border-[#C66B91]/50 hover:bg-[#C66B91]/10 hover:border-[#C66B91] hover:shadow-[0_0_20px_rgba(198,107,145,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";
  }

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type || "button"}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
