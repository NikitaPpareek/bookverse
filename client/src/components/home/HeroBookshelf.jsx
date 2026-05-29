/** Decorative bookshelf illustration for hero */
export default function HeroBookshelf({ className = "" }) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Shelves */}
      <rect x="24" y="48" width="272" height="6" rx="2" fill="#E6DED3" />
      <rect x="24" y="128" width="272" height="6" rx="2" fill="#E6DED3" />
      <rect x="24" y="208" width="272" height="6" rx="2" fill="#E6DED3" />
      <rect x="20" y="44" width="8" height="176" rx="2" fill="#DAB8AE" />
      <rect x="292" y="44" width="8" height="176" rx="2" fill="#DAB8AE" />

      {/* Row 1 books */}
      <rect x="40" y="58" width="28" height="62" rx="2" fill="#810B38" />
      <rect x="44" y="62" width="4" height="54" rx="1" fill="#5C0828" opacity="0.4" />
      <rect x="76" y="52" width="22" height="68" rx="2" fill="#C287E8" />
      <rect x="106" y="60" width="32" height="60" rx="2" fill="#1A1A1A" />
      <rect x="110" y="64" width="6" height="20" rx="1" fill="#DAB8AE" />
      <rect x="146" y="55" width="24" height="65" rx="2" fill="#810B38" opacity="0.85" />
      <rect x="178" y="62" width="26" height="58" rx="2" fill="#DAB8AE" />
      <rect x="212" y="50" width="30" height="70" rx="2" fill="#C287E8" opacity="0.9" />
      <rect x="250" y="58" width="34" height="62" rx="2" fill="#810B38" />

      {/* Row 2 books */}
      <rect x="36" y="138" width="34" height="62" rx="2" fill="#1A1A1A" />
      <rect x="78" y="132" width="20" height="68" rx="2" fill="#810B38" />
      <rect x="106" y="140" width="28" height="60" rx="2" fill="#DAB8AE" />
      <rect x="142" y="135" width="24" height="65" rx="2" fill="#C287E8" />
      <rect x="174" y="142" width="32" height="58" rx="2" fill="#810B38" opacity="0.75" />
      <rect x="214" y="130" width="22" height="70" rx="2" fill="#1A1A1A" opacity="0.9" />
      <rect x="244" y="138" width="36" height="62" rx="2" fill="#C287E8" />

      {/* Row 3 — shorter */}
      <rect x="48" y="218" width="26" height="52" rx="2" fill="#C287E8" />
      <rect x="82" y="222" width="30" height="48" rx="2" fill="#810B38" />
      <rect x="120" y="216" width="22" height="54" rx="2" fill="#DAB8AE" />
      <rect x="150" y="220" width="28" height="50" rx="2" fill="#1A1A1A" />
      <rect x="186" y="214" width="32" height="56" rx="2" fill="#810B38" opacity="0.8" />
      <rect x="226" y="218" width="24" height="52" rx="2" fill="#C287E8" opacity="0.85" />

      {/* Reading lamp accent */}
      <circle cx="288" cy="100" r="20" fill="#F6F1E8" stroke="#E6DED3" strokeWidth="2" />
      <circle cx="288" cy="100" r="10" fill="#DAB8AE" opacity="0.6" />
      <path d="M288 120 L288 200" stroke="#DAB8AE" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
