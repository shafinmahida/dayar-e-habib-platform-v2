"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show button after scroll or a short delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const waUrl = "https://wa.me/917045707070?text=Assalamu%20Alaikum%20Dayar-E-Habib,%20I%20would%20like%20to%20inquire%20about%20your%20upcoming%20pilgrimage%20packages.";

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-3 rounded-none shadow-[0_8px_30px_rgba(37,211,102,0.25)] hover:bg-[#20ba5a] active:scale-95 transition-all duration-500 group select-none focus-visible:outline-none",
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      )}
    >
      {/* CSS Pulse Ring */}
      <span className="absolute inset-0 rounded-none border-2 border-[#25D366] animate-[ping_2s_infinite] opacity-50 z-0 pointer-events-none" />

      {/* Custom WhatsApp Icon SVG */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 shrink-0 relative z-10 animate-bounce"
        style={{ animationDuration: "3s" }}
        aria-hidden="true"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.42 9.863-9.864.002-2.637-1.023-5.116-2.887-6.981C16.578 1.895 14.103.872 11.474.872c-5.441 0-9.865 4.422-9.868 9.866-.001 1.802.489 3.562 1.418 5.116l-.995 3.637 3.733-.979zm11.233-7.558c-.305-.153-1.805-.89-2.083-.99-.278-.102-.48-.153-.682.153-.201.304-.778 1.012-.953 1.214-.176.203-.351.229-.656.077-.305-.152-1.288-.475-2.454-1.516-.908-.81-1.52-1.81-1.698-2.115-.178-.305-.019-.47.133-.621.137-.137.305-.355.457-.532.152-.178.203-.305.305-.51.101-.203.05-.381-.025-.533-.076-.152-.682-1.644-.934-2.253-.245-.595-.494-.514-.682-.524-.175-.01-.376-.011-.577-.011-.202 0-.531.076-.809.381-.278.305-1.062 1.039-1.062 2.535 0 1.497 1.088 2.943 1.24 3.146.152.203 2.142 3.272 5.19 4.588.724.313 1.29.5 1.73.64.729.23 1.391.198 1.916.12.584-.087 1.805-.738 2.058-1.453.253-.715.253-1.327.177-1.453-.076-.127-.278-.203-.583-.356z" />
      </svg>
      
      <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.25em] max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-700 ease-in-out whitespace-nowrap">
        Quick Inquiry
      </span>
    </a>
  );
}
