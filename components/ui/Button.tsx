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
      ? "bg-[#702442] text-[#F8EDF2] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:bg-[#862F52] hover:shadow-[0_0_25px_rgba(198,107,145,0.35)] active:scale-[0.98]"
      : "border border-[#C66B91] text-[#C66B91] hover:bg-[#C66B91]/10 hover:border-[#C66B91] hover:shadow-[0_0_20px_rgba(198,107,145,0.2)] active:scale-[0.98]";

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
