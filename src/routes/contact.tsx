import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the Atelier — AUREVIA Watches" },
      {
        name: "description",
        content:
          "Reach the Aurevia client care team in Karachi for sizing, servicing, warranty and order questions.",
      },
      { property: "og:title", content: "Contact the Atelier — AUREVIA Watches" },
      {
        property: "og:description",
        content: "Client care, servicing and warranty support from our Karachi atelier.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please add your name, email and message.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message received", {
        description: "Our client care team replies within one working day.",
      });
    }, 700);
  };

  const field =
    "w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-gold";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="text-eyebrow text-gold">Client Care</p>
      <h1 className="font-display mt-2 text-5xl">Talk to the atelier</h1>

      <div className="mt-14 grid gap-16 md:grid-cols-2">
        <form onSubmit={submit} className="space-y-6">
          <input
            className={field}
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className={field}
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className={field}
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
          <textarea
            className={`${field} min-h-32 resize-none`}
            placeholder="How can we help?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            disabled={sending}
            className="border border-ink px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-colors hover:bg-ink hover:text-champagne disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>

        <div className="space-y-8">
          {[
            { icon: MapPin, t: "Atelier & Boutique", d: "12-C Zamzama Boulevard, Clifton, Karachi" },
            { icon: Phone, t: "Client Care", d: "+92 21 3537 0042 · WhatsApp +92 300 214 9080" },
            { icon: Mail, t: "Email", d: "care@aureviawatches.pk" },
            { icon: Clock, t: "Hours", d: "Monday to Saturday, 11:00 – 20:00 PKT" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4 border-b border-border pb-6">
              <Icon className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="text-sm font-medium">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
