export default function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-card dark:bg-dark-card border border-border dark:border-dark-border shadow-[var(--shadow-card)]">
      <div className="skeleton aspect-[2/3] w-full" />
      <div className="p-3.5 space-y-2">
        <div className="skeleton h-2.5 w-14 rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-2.5 w-1/2 rounded" />
        <div className="skeleton h-8 w-full rounded-lg mt-2" />
      </div>
    </div>
  );
}
