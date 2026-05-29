import { useState } from "react";
import { HiMail } from "react-icons/hi";
import { useToast } from "../../contexts/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast("Thanks for subscribing! (demo — stored locally only)");
    setEmail("");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
      <div className="section-panel p-8 md:p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none"
          aria-hidden
        />
        <div className="relative text-center max-w-lg mx-auto">
          <HiMail className="mx-auto mb-3 text-primary dark:text-lavender" size={32} />
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground dark:text-[#f0eef2] mb-2 tracking-tight">
            Stay in the Loop
          </h2>
          <p className="text-sm text-muted dark:text-[#f0eef2]/60 mb-6 leading-relaxed">
            Curated picks, trending reads, and genre highlights — delivered weekly.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-background dark:bg-dark-elevated border border-border dark:border-dark-border text-foreground placeholder:text-muted/60 outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary/40 font-medium text-sm"
            />
            <button type="submit" className="btn-primary px-6 py-3 text-sm shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
