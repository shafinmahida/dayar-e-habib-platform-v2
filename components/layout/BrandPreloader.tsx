"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";

export function BrandPreloader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if preloader has already run in this session to protect user UX
    const hasRun = sessionStorage.getItem("dh-preloader-run");
    if (hasRun) {
      return;
    }

    const mountTimer = setTimeout(() => {
      setMounted(true);
      document.body.style.overflow = "hidden";
    }, 0);

    // Start transition-out animation after 1.5 seconds of presentation
    const fadeTimer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    // Unmount preloader from DOM and restore page flow after animation completes
    const hideTimer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("dh-preloader-run", "true");
    }, 2500);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#F2EBDB] flex items-center justify-center transition-all duration-[1000ms] ease-in-out ${
        visible ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center gap-6 text-center px-6">
        {/* Animated Logo - Scaling and translating toward top-left corner */}
        <div
          className={`transition-all duration-[1000ms] ease-in-out ${
            visible 
              ? "scale-[0.2] opacity-0 -translate-x-[42vw] -translate-y-[45vh]" 
              : "scale-100 opacity-100 animate-in zoom-in-95 duration-1000"
          }`}
        >
          <Logo
            variant="full"
            className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto text-foreground"
          />
        </div>

        {/* Subtitle brand registration info */}
        <div
          className={`text-[9px] font-black uppercase tracking-[0.3em] text-accent/80 transition-all duration-500 delay-100 ${
            visible ? "opacity-0 translate-y-4" : "opacity-100 animate-in fade-in slide-in-from-bottom-2 duration-1000"
          }`}
        >
          Established 1986 — Mumbai, India
        </div>
      </div>
    </div>
  );
}
