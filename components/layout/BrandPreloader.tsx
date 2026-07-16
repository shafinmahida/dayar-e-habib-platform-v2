"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";

export function BrandPreloader() {
  const [visible, setVisible] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    // Start fade-out after 0.6s (just enough to register the brand)
    const fadeTimer = setTimeout(() => {
      setVisible(true);
    }, 600);

    // Unmount after 1.2s total (0.6s display + 0.6s fade animation)
    const hideTimer = setTimeout(() => {
      setUnmounted(true);
    }, 1200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (unmounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-[#F2EBDB] flex items-center justify-center transition-opacity duration-500 ease-out ${
        visible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center gap-8 text-center px-6">
        <div
          className="transition-all"
          style={
            visible
              ? {
                  transform: "scale(0.85)",
                  opacity: 0,
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }
              : {
                  transform: "scale(1)",
                  opacity: 1,
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }
          }
        >
          <Logo
            variant="full"
            className="h-28 sm:h-36 md:h-44 lg:h-52 max-w-[85vw] sm:max-w-none w-auto text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
