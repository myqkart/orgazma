import React from "react";

/** The Orgazma mark: a gold coin and a night heart. Same drawing as the favicon. */
export function Logo({
  className = "",
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="32" height="32" rx="8" fill="#04060f" />
      <circle cx="16" cy="16" r="13" fill="#e6b35a" />
      <path
        fill="#1a1408"
        d="M16 15.4C14.8 11.6 10.2 9.4 8.4 12.2 6.2 15.4 8.6 19 16 25.2 23.4 19 25.8 15.4 23.6 12.2 21.8 9.4 17.2 11.6 16 15.4Z"
      />
    </svg>
  );
}
