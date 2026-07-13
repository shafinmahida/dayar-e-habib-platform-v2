"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show widget after 1.5 seconds
    const widgetTimer = setTimeout(() => {
      setVisible(true);
    }, 1500);

    // Show tooltip message after 3.5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3500);

    return () => {
      clearTimeout(widgetTimer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const waUrl = "https://wa.me/917045707070?text=Assalamu%20Alaikum%20Dayar-E-Habib,%20I%20would%20like%20to%20inquire%20about%20your%20upcoming%20pilgrimage%20packages.";

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500",
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95 pointer-events-none"
      )}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wax-wobble {
          0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: rotate(0deg); }
          33% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; transform: rotate(5deg) scale(0.98); }
          66% { border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%; transform: rotate(-4deg) scale(1.02); }
        }
        .wax-seal-btn {
          animation: wax-wobble 8s infinite ease-in-out;
        }
      `}} />

      {/* Parchment Live Chat Tooltip Message Balloon */}
      {showTooltip && (
        <div 
          className={cn(
            "relative bg-[#FAF6EE] border-2 border-[#D4AF37]/40 px-5 py-4 shadow-[5px_5px_25px_rgba(30,26,22,0.12)] flex items-start gap-3.5 max-w-[260px] sm:max-w-xs animate-in fade-in slide-in-from-right-4 duration-500 rounded-2xl",
            "after:absolute after:-right-[7px] after:top-1/2 after:-translate-y-1/2 after:w-3 after:h-3 after:bg-[#FAF6EE] after:border-r-2 after:border-t-2 after:border-[#D4AF37]/40 after:rotate-45"
          )}
        >
          {/* Close button for tooltip */}
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -left-2 size-5 bg-[#FAF6EE] hover:bg-[#8A6A36] hover:text-white flex items-center justify-center rounded-full text-stone-600 border-2 border-[#D4AF37]/40 transition-colors shadow-sm"
            aria-label="Close message"
          >
            <X className="size-3" />
          </button>

          {/* Mini Gold Seal Avatar */}
          <div className="relative size-9 shrink-0 rounded-full bg-gradient-to-br from-[#E2B755] to-[#8A6A36] border border-[#D4AF37] flex items-center justify-center shadow-md">
            <span className="absolute bottom-0 right-0 size-2.5 bg-[#25D366] rounded-full border-2 border-[#FAF6EE] animate-ping" />
            <span className="absolute bottom-0 right-0 size-2.5 bg-[#25D366] rounded-full border-2 border-[#FAF6EE]" />
            <span className="font-serif text-[10px] font-black text-white select-none">DH</span>
          </div>

          <div className="space-y-1 text-left">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8A6A36]">Direct Envoy</p>
            <p className="text-xs font-bold text-[#2A241E] leading-relaxed">
              Assalamu Alaikum! Connect instantly with a guide for Hajj & Umrah planning.
            </p>
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#8A6A36] hover:text-[#25D366] pt-1 transition-colors"
            >
              Open Scroll &rarr;
            </a>
          </div>
        </div>
      )}

      {/* Main Wax Seal Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wax-seal-btn relative flex size-16 items-center justify-center bg-gradient-to-br from-[#F5D061] via-[#C59B27] to-[#8A6A36] shadow-[0_10px_30px_rgba(138,106,54,0.3)] hover:shadow-[0_15px_40px_rgba(138,106,54,0.5)] active:scale-95 transition-all duration-300 group border border-[#D4AF37]/50"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsating Aura */}
        <span className="absolute -inset-1.5 rounded-full border-2 border-[#D4AF37]/30 animate-[ping_3s_infinite] opacity-60 pointer-events-none" />

        {/* 3D Wax Seal Ring details */}
        <div className="absolute inset-1 rounded-[inherit] border-2 border-white/20 pointer-events-none" />

        {/* Central Logo Stamp */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[15deg]"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.981C16.578 1.895 14.103.872 11.474.872c-5.441 0-9.865 4.422-9.868 9.866-.001 1.802.489 3.562 1.418 5.116l-.995 3.637 3.733-.979zm11.233-7.558c-.305-.153-1.805-.89-2.083-.99-.278-.102-.48-.153-.682.153-.201.304-.778 1.012-.953 1.214-.176.203-.351.229-.656.077-.305-.152-1.288-.475-2.454-1.516-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.621.137-.137.305-.355.457-.532.152-.178.203-.305.305-.51.101-.203.05-.381-.025-.533-.076-.152-.682-1.644-.934-2.253-.245-.595-.494-.514-.682-.524-.175-.01-.376-.011-.577-.011-.202 0-.531.076-.809.381-.278.305-1.062 1.039-1.062 2.535 0 1.497 1.088 2.943 1.24 3.146.152.203 2.142 3.272 5.19 4.588.724.313 1.29.5 1.73.64.729.23 1.391.198 1.916.12.584-.087 1.805-.738 2.058-1.453.253-.715.253-1.327.177-1.453-.076-.127-.278-.203-.583-.356z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
