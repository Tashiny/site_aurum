"use client";

import { useState } from "react";

type State = "idle" | "sending" | "done" | "error";

const copy = {
  ru: {
    name: "Имя",
    contact: "Telegram или email",
    brief: "Коротко о проекте",
    send: "Отправить заявку",
    sending: "Отправляем…",
    done: "Заявка ушла. Ответим в течение дня.",
    error: "Не отправилось. Напишите в Telegram.",
  },
  en: {
    name: "Name",
    contact: "Telegram or email",
    brief: "About the project",
    send: "Send request",
    sending: "Sending…",
    done: "Request sent. We reply within a day.",
    error: "Failed. Please reach us on Telegram.",
  },
};

export default function LeadForm({ lang }: { lang: "ru" | "en" }) {
  const [state, setState] = useState<State>("idle");
  const t = copy[lang];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("bad response");
      setState("done");
      e.currentTarget.reset();
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full border-b hairline bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-bone/30 focus:border-aurum";

  return (
    <form onSubmit={onSubmit} className="grid gap-7">
      <input name="name" required placeholder={t.name} className={field} autoComplete="name" />
      <input name="contact" required placeholder={t.contact} className={field} />
      <textarea name="brief" rows={3} placeholder={t.brief} className={`${field} resize-none`} />
      {/* honeypot против спам-ботов */}
      <input name="company" tabIndex={-1} aria-hidden className="hidden" />

      <button
        type="submit"
        disabled={state === "sending"}
        className="group mt-2 flex w-fit items-center gap-4 rounded-full bg-bone px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {state === "sending" ? t.sending : t.send}
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>

      {state === "done" && <p className="text-sm text-aurum">{t.done}</p>}
      {state === "error" && <p className="text-sm text-red-400">{t.error}</p>}
    </form>
  );
}
