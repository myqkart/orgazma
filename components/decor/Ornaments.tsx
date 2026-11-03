import React from "react";

/** Soft rose outline — decorative only */
export function RoseOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M60 98c-18-10-32-28-32-46 0-14 10-26 24-30 2 12 10 22 20 28-6 6-10 14-12 24z"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.9"
      />
      <path
        d="M72 22c8 4 14 12 16 22-10 2-20 8-26 16-6-8-8-18-6-28 4-4 10-8 16-10z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M48 30c-8 6-12 16-10 26 8-2 18 0 26 6 2-10 0-20-6-28-4-2-6-4-10-4z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M60 52c6 4 10 10 12 18-8 2-14 8-18 14-4-8-4-16 0-24 2-4 4-6 6-8z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M60 98v-8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M60 100c-8 4-14 10-16 14M60 100c8 4 14 10 16 14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function HeartOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 54S10 40 10 24c0-8 6-14 14-14 5 0 8 2 8 2s3-2 8-2c8 0 14 6 14 14 0 16-22 30-22 30z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 2l2.4 12.2L34 18l-11.6 3.8L20 34l-2.4-12.2L6 18l11.6-3.8L20 2z" />
    </svg>
  );
}

export function FlourishOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 20c30-18 50-18 80 0 30 18 50 18 80 0 10-6 18-8 20-8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="100" cy="20" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function VineCorner({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M12 148C28 110 48 88 86 72c22-10 40-28 48-56"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M86 72c8 6 10 16 6 24M68 90c10-2 18 4 20 12"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M48 108c-6-10-4-18 2-22 4 6 10 10 18 12-6 6-14 10-20 10z"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.85"
      />
      <circle cx="134" cy="18" r="2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
