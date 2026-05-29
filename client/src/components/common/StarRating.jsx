import { HiStar } from "react-icons/hi";
import { renderStars } from "../../utils/bookHelpers";

export default function StarRating({ rating, size = 16, showValue = true, count }) {
  if (rating == null || rating === 0) {
    return showValue ? (
      <span className="text-xs text-muted dark:text-[#f0eef2]/50">No ratings yet</span>
    ) : null;
  }

  const { full, half, empty } = renderStars(rating);
  const iconSize = size;

  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      {[...Array(full)].map((_, i) => (
        <HiStar key={`f${i}`} size={iconSize} className="text-primary dark:text-lavender" />
      ))}
      {half && <HiStar size={iconSize} className="text-primary dark:text-lavender opacity-50" />}
      {[...Array(empty)].map((_, i) => (
        <HiStar key={`e${i}`} size={iconSize} className="text-border dark:text-dark-border" />
      ))}
      {showValue && (
        <span className="ml-1 text-xs font-semibold text-foreground dark:text-[#f0eef2]/80">
          {Number(rating).toFixed(1)}
          {count > 0 && (
            <span className="text-muted font-normal"> ({count.toLocaleString()})</span>
          )}
        </span>
      )}
    </div>
  );
}
