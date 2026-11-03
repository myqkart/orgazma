import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  clean?: boolean; // if true, don't apply vertical section padding
}

export function Container({
  children,
  className = "",
  clean = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={`max-w-[1200px] mx-auto px-5 sm:px-6 md:px-8 ${
        clean ? "" : "py-14 md:py-24"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

