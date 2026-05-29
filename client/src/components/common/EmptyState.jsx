import { FiBookOpen } from "react-icons/fi";

export default function EmptyState({ title = "Nothing here yet", message, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-surface dark:bg-dark-elevated border border-border dark:border-dark-border flex items-center justify-center mb-6">
        <FiBookOpen size={36} className="text-primary dark:text-lavender" />
      </div>
      <h3 className="font-display text-2xl sm:text-3xl text-foreground dark:text-[#f0eef2] mb-2 tracking-tight">{title}</h3>
      {message && (
        <p className="text-muted dark:text-[#f0eef2]/55 max-w-md mb-6 text-sm leading-relaxed">{message}</p>
      )}
      {action}
    </div>
  );
}
