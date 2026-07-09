"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";

export function BrandPreloader() {
  const [visible, setVisible] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    // Lock scroll immediately on mount just in case
    document.body.style.overflow = "hidden";

    // Start transition-out animation after 1.5 seconds of presentation
    const fadeTimer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    // Unmount preloader from DOM and restore page flow after animation completes
    const hideTimer = setTimeout(() => {
      setUnmounted(true);
      document.body.style.overflow = "";
    }, 3900); // 1.5s + 2.4s transition window

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (unmounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#F2EBDB] flex items-center justify-center transition-opacity duration-[1000ms] ease-in-out ${
        visible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center gap-8 text-center px-6">
        {/* Animated Logo - Scaling and translating toward top-left corner */}
        <div
          className="transition-all"
          style={
            visible
              ? {
                  transform: "translate(-42vw, -45vh) scale(0.08)",
                  opacity: 0,
                  transition: "all 2.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }
              : {
                  transform: "translate(0, 0) scale(1)",
                  opacity: 1,
                  transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
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
