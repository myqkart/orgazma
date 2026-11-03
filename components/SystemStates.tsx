"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export function LoadingState() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex gap-2 mb-4" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[#C66B91] animate-bounce [animation-delay:-0.3s] shadow-[0_0_10px_rgba(198,107,145,0.6)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#C66B91] animate-bounce [animation-delay:-0.15s] shadow-[0_0_10px_rgba(198,107,145,0.6)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#C66B91] animate-bounce shadow-[0_0_10px_rgba(198,107,145,0.6)]" />
      </div>
      <p className="font-reading italic text-lg md:text-xl text-[#BFA5B1] tracking-wide">
        Setting the mood…
      </p>
    </div>
  );
}

interface EmptyStateProps {
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  message = "Nothing here yet. Something good is coming.",
  actionText = "Check back soon",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[340px] p-8 text-center max-w-md mx-auto">
      <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/[0.1] flex items-center justify-center mb-6 text-[#C66B91] shadow-[0_0_20px_rgba(198,107,145,0.15)]">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <p className="font-display text-xl md:text-2xl text-[#F8EDF2] mb-6 leading-relaxed">
        {message}
      </p>
      {actionText && (
        <Button variant="glass" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

interface ErrorStateProps {
  onReload?: () => void;
}

export function ErrorState({ onReload }: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[340px] p-8 text-center max-w-md mx-auto"
      role="alert"
    >
      <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-[#C66B91]/30 flex items-center justify-center mb-6 text-[#C66B91] shadow-[0_0_25px_rgba(198,107,145,0.25)]">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      </div>
      <p className="font-display text-xl md:text-2xl text-[#F8EDF2] mb-6 leading-relaxed">
        The lights flickered. Try again in a moment.
      </p>
      <Button
        variant="primary"
        onClick={() => {
          if (onReload) onReload();
          else if (typeof window !== "undefined") window.location.reload();
        }}
      >
        Reload
      </Button>
    </div>
  );
}
