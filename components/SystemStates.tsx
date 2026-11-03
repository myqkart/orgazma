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
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" />
      </div>
      <p className="font-reading italic text-lg md:text-xl text-muted tracking-wide">
        Warming the sheets…
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
  message = "Nothing filthy here yet. Something wet is coming.",
  actionText = "Check back soon",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[340px] p-8 text-center max-w-md mx-auto">
      <p className="font-display text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
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

export function ErrorState({ onReload }: { onReload?: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[340px] p-8 text-center max-w-md mx-auto"
      role="alert"
    >
      <p className="font-display text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
        The lights flickered. Try again in a moment.
      </p>
      <Button
        variant="primary"
        onClick={() => {
          if (onReload) onReload();
          else window.location.reload();
        }}
      >
        Reload
      </Button>
    </div>
  );
}
