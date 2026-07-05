import React from "react";

export function KaabaIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Kaaba Main Cube Outline */}
      <path d="M12 3L3.5 7.5v9L12 21l8.5-4.5v-9L12 3z" />
      {/* Vertical center fold divider line */}
      <path d="M12 3v18" />
      {/* Kiswa Belt drapery wrap */}
      <path d="M3.5 10.5L12 15l8.5-4.5" />
      <path d="M3.5 11.8L12 16.3l8.5-4.5" />
      {/* Kaaba Golden Door (Bab al-Kaaba) */}
      <path d="M14 14v4l3-1.6v-4.1z" fill="currentColor" fillOpacity="0.15" />
    </svg>
  );
}

export function MadinahIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Madinah Prophet's Mosque Dome Contour */}
      <path d="M12 21V13.5" />
      <path 
        d="M12 13.5c-2.2 0-4-1.8-4-4 0-1.2.8-2.4 2-2.8C10.5 5 11.2 4.2 12 4.2s1.5.8 2 2.5c1.2.4 2 1.6 2 2.8 0 2.2-1.8 4-4 4z" 
        fill="currentColor" 
        fillOpacity="0.15" 
      />
      {/* Crescent Spire */}
      <path d="M12 4.2V2" />
      <path d="M11 2a1 1 0 0 1 2 0" />
      {/* Symmetrical flanking minarets */}
      <path d="M4 21V8h1.5v13H4z" />
      <path d="M3.5 8h2.5L4.75 6.5z" />
      <path d="M18.5 21V8H20v13h-1.5z" />
      <path d="M18 8h2.5L19.25 6.5z" />
    </svg>
  );
}

export function AziziaIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Apartment block building outline */}
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" fill="currentColor" fillOpacity="0.1" />
      {/* Windows list grid representation */}
      <path d="M8 7h2v2H8V7z" />
      <path d="M14 7h2v2h-2V7z" />
      <path d="M8 11h2v2H8v-2z" />
      <path d="M14 11h2v2h-2v-2z" />
      <path d="M8 15h2v2H8v-2z" />
      <path d="M14 15h2v2h-2v-2z" />
    </svg>
  );
}
