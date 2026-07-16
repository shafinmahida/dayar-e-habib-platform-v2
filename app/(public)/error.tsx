"use client";

import { useEffect } from "react";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md space-y-6">
        <div className="text-6xl font-heading font-black text-muted-foreground/30">!</div>
        <h2 className="text-xl font-heading font-bold text-foreground">
          Something went wrong
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We encountered an unexpected issue loading this page.
          Please try again or contact us if the problem persists.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center h-11 px-8 text-[10px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-accent transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
