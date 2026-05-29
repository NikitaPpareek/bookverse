import { useState } from "react";
import { BookOpen } from "lucide-react";
import { FALLBACK_COVER, upgradeCoverUrl } from "../../utils/bookHelpers";

export default function BookCover({ src, alt, className = "", containerClass = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageSrc = error ? FALLBACK_COVER : upgradeCoverUrl(src) || FALLBACK_COVER;

  return (
    <div className={`relative overflow-hidden bg-secondary/30 dark:bg-[#3d3835] ${containerClass}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton flex items-center justify-center">
          <BookOpen size={28} className="text-primary/40" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-accent/50 dark:bg-[#3d3835] text-primary/60">
          <BookOpen size={32} />
          <span className="text-xs mt-2 font-medium">No cover</span>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true); }}
        className={`w-full h-full object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
}
