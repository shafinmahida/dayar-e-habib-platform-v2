"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const widgetTimer = setTimeout(() => setVisible(true), 1500);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 3500);
    return () => {
      clearTimeout(widgetTimer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  const waUrl =
    "https://wa.me/917045707070?text=Assalamu%20Alaikum%20Dayar-E-Habib,%20I%20would%20like%20to%20inquire%20about%20your%20upcoming%20pilgrimage%20packages.";

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* ── Fluid Blob Morph ── */
          @keyframes wa-morph {
            0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            14%  { border-radius: 40% 60% 55% 45% / 50% 65% 35% 50%; }
            28%  { border-radius: 55% 45% 65% 35% / 35% 55% 45% 65%; }
            42%  { border-radius: 30% 70% 40% 60% / 70% 40% 60% 30%; }
            57%  { border-radius: 70% 30% 50% 50% / 45% 65% 35% 55%; }
            71%  { border-radius: 45% 55% 35% 65% / 60% 40% 70% 30%; }
            85%  { border-radius: 50% 50% 70% 30% / 30% 70% 30% 70%; }
            100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          }

          /* ── Vertical Float ── */
          @keyframes wa-float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50%       { transform: translateY(-9px) scale(1.02); }
          }

          /* ── Caustic Highlight Sweep ── */
          @keyframes wa-caustic {
            0%   { opacity: 0.6; transform: translate(-30%, -40%) scale(1); }
            40%  { opacity: 0.9; transform: translate(-20%, -50%) scale(1.1); }
            70%  { opacity: 0.5; transform: translate(-40%, -30%) scale(0.9); }
            100% { opacity: 0.6; transform: translate(-30%, -40%) scale(1); }
          }

          /* ── Outer Ring Pulse ── */
          @keyframes wa-ring-pulse {
            0%   { transform: scale(1);   opacity: 0.6; }
            100% { transform: scale(1.9); opacity: 0; }
          }

          /* ── Glow Breathe ── */
          @keyframes wa-glow {
            0%, 100% { box-shadow:
              0  0  0  0   rgba(37,211,102,0),
              0  8px 25px   rgba(37,211,102,0.35),
              0 18px 50px   rgba(7, 94, 84, 0.25); }
            50% { box-shadow:
              0  0  0  12px rgba(37,211,102,0.08),
              0  8px 35px   rgba(37,211,102,0.55),
              0 22px 70px   rgba(7, 94, 84, 0.4); }
          }

          /* ── Orbiting Particles ── */
          @keyframes wa-orbit-1 {
            from { transform: rotate(0deg)   translateX(38px) rotate(0deg); }
            to   { transform: rotate(360deg) translateX(38px) rotate(-360deg); }
          }
          @keyframes wa-orbit-2 {
            from { transform: rotate(120deg)  translateX(34px) rotate(-120deg); }
            to   { transform: rotate(480deg)  translateX(34px) rotate(-480deg); }
          }
          @keyframes wa-orbit-3 {
            from { transform: rotate(240deg)  translateX(42px) rotate(-240deg); }
            to   { transform: rotate(600deg)  translateX(42px) rotate(-600deg); }
          }
          @keyframes wa-orbit-4 {
            from { transform: rotate(60deg)   translateX(30px) rotate(-60deg); }
            to   { transform: rotate(420deg)  translateX(30px) rotate(-420deg); }
          }

          /* ── Icon Spin on Hover ── */
          @keyframes wa-icon-spin {
            0%   { transform: rotate(0deg) scale(1); }
            100% { transform: rotate(360deg) scale(1.15); }
          }

          /* ── Inner Shimmer ── */
          @keyframes wa-shimmer {
            0%   { opacity: 0.15; transform: rotate(0deg); }
            50%  { opacity: 0.35; transform: rotate(180deg); }
            100% { opacity: 0.15; transform: rotate(360deg); }
          }

          .wa-orb-wrap {
            animation: wa-float 4s ease-in-out infinite;
          }
          .wa-orb-wrap:hover {
            animation: wa-float 4s ease-in-out infinite, wa-glow 1.5s ease-in-out infinite;
          }
          .wa-orb {
            animation: wa-morph 9s ease-in-out infinite, wa-glow 3s ease-in-out infinite;
            transition: filter 0.3s ease;
          }
          .wa-orb:hover {
            filter: brightness(1.12);
            animation: wa-morph 5s ease-in-out infinite, wa-glow 1s ease-in-out infinite;
          }
          .wa-caustic {
            animation: wa-caustic 5s ease-in-out infinite;
          }
          .wa-shimmer {
            animation: wa-shimmer 8s linear infinite;
          }
          .wa-ring-1 { animation: wa-ring-pulse 2.5s ease-out infinite; }
          .wa-ring-2 { animation: wa-ring-pulse 2.5s ease-out infinite 0.8s; }
          .wa-ring-3 { animation: wa-ring-pulse 2.5s ease-out infinite 1.6s; }
          .wa-p1 { animation: wa-orbit-1 4s linear infinite; }
          .wa-p2 { animation: wa-orbit-2 5.5s linear infinite; }
          .wa-p3 { animation: wa-orbit-3 7s linear infinite; }
          .wa-p4 { animation: wa-orbit-4 3.5s linear infinite; }
          .wa-orb:hover .wa-icon { animation: wa-icon-spin 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        `
      }} />

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-4 transition-all duration-700",
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-90 pointer-events-none"
        )}
      >
        {/* ── Tooltip Balloon ── */}
        {showTooltip && (
          <div className={cn(
            "relative animate-in fade-in slide-in-from-right-4 duration-500",
            "bg-white/95 backdrop-blur-md border border-[#25D366]/20 rounded-2xl px-4 py-3.5",
            "shadow-[0_8px_32px_rgba(0,0,0,0.12),0_0_0_1px_rgba(37,211,102,0.1)]",
            "max-w-[240px]",
            "after:absolute after:right-[-6px] after:top-1/2 after:-translate-y-1/2",
            "after:w-3 after:h-3 after:bg-white/95 after:border-r after:border-t",
            "after:border-[#25D366]/20 after:rotate-45"
          )}>
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 size-5 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 shadow-sm transition-colors"
              aria-label="Close"
            >
              <X className="size-3" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 rounded-full bg-[#25D366] animate-pulse shadow-[0_0_6px_#25D366]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#075E54]">Online Now</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 leading-relaxed">
              Assalamu Alaikum! Our pilgrimage guides are ready to help you plan your journey. ✨
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#075E54] hover:text-[#25D366] transition-colors"
            >
              <span>Start conversation</span>
              <span>→</span>
            </a>
          </div>
        )}

        {/* ── Main 3D Orb Wrapper (handles float) ── */}
        <div
          className="wa-orb-wrap relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Pulse rings behind orb */}
          <span className="wa-ring-1 absolute inset-0 rounded-[inherit] border border-[#25D366]/40 pointer-events-none" style={{ borderRadius: '50%' }} />
          <span className="wa-ring-2 absolute inset-0 rounded-[inherit] border border-[#25D366]/25 pointer-events-none" style={{ borderRadius: '50%' }} />
          <span className="wa-ring-3 absolute inset-0 rounded-[inherit] border border-[#25D366]/15 pointer-events-none" style={{ borderRadius: '50%' }} />

          {/* Orbiting particles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            {/* Particle 1 */}
            <span className="wa-p1 absolute size-2 rounded-full"
              style={{ background: 'radial-gradient(circle, #7FFFA8 0%, #25D366 60%, transparent 100%)', boxShadow: '0 0 6px #25D366' }} />
            {/* Particle 2 */}
            <span className="wa-p2 absolute size-1.5 rounded-full"
              style={{ background: 'radial-gradient(circle, #B8FFD0 0%, #128C7E 60%, transparent 100%)', boxShadow: '0 0 5px #128C7E' }} />
            {/* Particle 3 */}
            <span className="wa-p3 absolute size-1 rounded-full"
              style={{ background: 'radial-gradient(circle, #fff 0%, #25D366 70%, transparent 100%)', boxShadow: '0 0 4px #25D366' }} />
            {/* Particle 4 – tiny */}
            <span className="wa-p4 absolute size-1 rounded-full opacity-70"
              style={{ background: 'radial-gradient(circle, #A8FFD0 0%, #075E54 70%, transparent 100%)', boxShadow: '0 0 3px #128C7E' }} />
          </div>

          {/* ── The Orb itself ── */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className="wa-orb group relative flex size-[68px] items-center justify-center overflow-hidden cursor-pointer"
            style={{
              /* 3D sphere via layered radial gradients */
              background: `
                radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55) 0%, transparent 45%),
                radial-gradient(circle at 65% 75%, rgba(7,94,84,0.8) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, #34D36C 0%, #25D366 30%, #128C7E 65%, #075E54 100%)
              `,
              /* Deep 3D shadow stack */
              boxShadow: `
                inset 0 -8px 20px rgba(7,94,84,0.6),
                inset 0  6px 15px rgba(255,255,255,0.25),
                inset -4px 0 12px rgba(7,94,84,0.3),
                0 12px 30px rgba(7,94,84,0.4),
                0 4px  10px rgba(37,211,102,0.3)
              `,
            }}
          >
            {/* Caustic light blob — simulates light refracting on a sphere */}
            <span
              className="wa-caustic absolute pointer-events-none"
              style={{
                width: '55%',
                height: '45%',
                top: '15%',
                left: '18%',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                borderRadius: '50%',
                filter: 'blur(4px)',
              }}
            />

            {/* Secondary depth shimmer */}
            <span
              className="wa-shimmer absolute inset-0 pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.12) 20%, transparent 40%)',
                borderRadius: 'inherit',
              }}
            />

            {/* Bottom inner shadow for depth bowl */}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 55% 80%, rgba(0,0,0,0.35) 0%, transparent 55%)',
                borderRadius: 'inherit',
              }}
            />

            {/* WhatsApp SVG icon */}
            <svg
              viewBox="0 0 24 24"
              fill="white"
              className="wa-icon relative z-10 size-8"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35)) drop-shadow(0 0 4px rgba(255,255,255,0.4))',
              }}
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.981C16.578 1.895 14.103.872 11.474.872c-5.441 0-9.865 4.422-9.868 9.866-.001 1.802.489 3.562 1.418 5.116l-.995 3.637 3.733-.979zm11.233-7.558c-.305-.153-1.805-.89-2.083-.99-.278-.102-.48-.153-.682.153-.201.304-.778 1.012-.953 1.214-.176.203-.351.229-.656.077-.305-.152-1.288-.475-2.454-1.516-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.621.137-.137.305-.355.457-.532.152-.178.203-.305.305-.51.101-.203.05-.381-.025-.533-.076-.152-.682-1.644-.934-2.253-.245-.595-.494-.514-.682-.524-.175-.01-.376-.011-.577-.011-.202 0-.531.076-.809.381-.278.305-1.062 1.039-1.062 2.535 0 1.497 1.088 2.943 1.24 3.146.152.203 2.142 3.272 5.19 4.588.724.313 1.29.5 1.73.64.729.23 1.391.198 1.916.12.584-.087 1.805-.738 2.058-1.453.253-.715.253-1.327.177-1.453-.076-.127-.278-.203-.583-.356z" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
