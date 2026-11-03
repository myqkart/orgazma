import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  clean?: boolean;
}

export function Container({
  children,
  className = "",
  clean = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={`max-w-[1180px] mx-auto w-full px-4 sm:px-6 md:px-8 ${
        clean ? "" : "py-12 sm:py-14 md:py-24"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
