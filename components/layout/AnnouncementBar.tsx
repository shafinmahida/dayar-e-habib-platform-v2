"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

interface AnnouncementBarProps {
  text: string;
  enabled: boolean;
}

export function AnnouncementBar({ text, enabled }: AnnouncementBarProps) {
  const storageKey = "deh-announcement-dismissed-v2";
  const [visible, setVisible] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;
    const dismissed = window.localStorage.getItem(storageKey) === "true";
    if (dismissed) {
      setTimeout(() => setVisible(false), 0);
    }
  }, [enabled]);

  const handleDismiss = () => {
    window.localStorage.setItem(storageKey, "true");
    setVisible(false);
  };

  if (!enabled || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="border-b border-border bg-[#FCFAF5] text-foreground font-medium"
    >
      <Container>
        <div className="relative flex min-h-10 items-center justify-center py-2 pr-10">
          <p className="text-center text-xs tracking-wider uppercase font-semibold">
            {text}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={handleDismiss}
            className="absolute top-1/2 right-0 -translate-y-1/2 text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            aria-label="Dismiss announcement"
          >
            <X aria-hidden="true" className="size-3.5" />
          </Button>
        </div>
      </Container>
    </div>
  );
}
