import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-sans font-medium text-sm md:text-base px-6 py-3 rounded-[14px] transition-all duration-300 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variantClasses =
    variant === "primary"
      ? "bg-[#4C87A5] text-[#0C1420] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-[#5B97B5] hover:shadow-[0_0_25px_rgba(141,194,208,0.3)] active:scale-[0.98]"
      : "border border-[#8DC2D0] text-[#8DC2D0] hover:bg-[#8DC2D0]/10 hover:border-[#8DC2D0] hover:shadow-[0_0_20px_rgba(141,194,208,0.2)] active:scale-[0.98]";

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type || "button"}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
