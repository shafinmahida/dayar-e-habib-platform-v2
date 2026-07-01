"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { SITE_SETTINGS } from "@/constants/settings";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(SITE_SETTINGS.announcementEnabled);

  useEffect(() => {
    if (!SITE_SETTINGS.announcementEnabled) {
      return;
    }

    const dismissed =
      window.localStorage.getItem(SITE_SETTINGS.announcementStorageKey) === "true";

    if (dismissed) {
      setTimeout(() => setVisible(false), 0);
    }
  }, []);

  const handleDismiss = () => {
    window.localStorage.setItem(SITE_SETTINGS.announcementStorageKey, "true");
    setVisible(false);
  };

  if (!SITE_SETTINGS.announcementEnabled || !visible) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Site announcement"
      className="border-b border-border bg-[#FCFAF5] text-foreground font-medium"
    >
      <Container>
        <div className="relative flex min-h-10 items-center justify-center py-2 pr-10">
          <p className="text-center text-xs tracking-wider uppercase font-semibold">
            {SITE_SETTINGS.announcementText}
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
