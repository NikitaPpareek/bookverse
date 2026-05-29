import { STATS } from "../../utils/constants";

export default function ReaderStats() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 rounded-xl bg-primary text-white shadow-sm hover:opacity-95 transition-opacity"
          >
            <p className="font-display text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
