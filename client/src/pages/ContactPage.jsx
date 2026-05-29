import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import SEO from "../components/common/SEO";
import { useToast } from "../contexts/ToastContext";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <SEO title="Contact" description="Get in touch with the BookVerse team." />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-brown dark:text-cream mb-4">Contact Us</h1>
        <p className="text-brown/70 dark:text-cream/70 max-w-xl mb-12">
          Have questions about your order, recommendations, or partnerships? We&apos;d love to hear from you.
        </p>
        <div className="grid lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-4 p-8 rounded-3xl bg-white/80 dark:bg-[#1a1212] border border-beige dark:border-[#3d2525]">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent outline-none focus:border-wine"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent outline-none focus:border-wine"
            />
            <textarea
              required
              placeholder="Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-beige bg-transparent outline-none focus:border-wine resize-none"
            />
            <button type="submit" className="w-full py-3.5 rounded-xl bg-wine text-cream font-semibold hover:bg-brown transition-colors">
              Send Message
            </button>
          </form>
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", text: "hello@bookverse.com" },
              { icon: Phone, title: "Phone", text: "+1 (555) 123-4567" },
              { icon: MapPin, title: "Address", text: "123 Literary Lane, Book City, BC 10001" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl bg-beige/30 dark:bg-[#2a1a1a]">
                <div className="w-12 h-12 rounded-xl bg-wine flex items-center justify-center text-cream shrink-0">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-brown dark:text-cream">{title}</h3>
                  <p className="text-brown/70 dark:text-cream/70">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
