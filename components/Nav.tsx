"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#work", ru: "Проекты", en: "Work" },
  { href: "#approach", ru: "Подход", en: "Approach" },
  { href: "#numbers", ru: "Цифры", en: "Numbers" },
  { href: "#contact", ru: "Контакт", en: "Contact" },
];

export default function Nav({ lang, onLang }: { lang: "ru" | "en"; onLang: (l: "ru" | "en") => void }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        solid ? "border-b hairline bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-display text-xl tracking-tight">
          Aurum<span className="text-aurum">.</span>
        </a>

        <ul className="hidden gap-9 text-[13px] uppercase tracking-[0.18em] text-bone/60 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-bone">
                {lang === "ru" ? l.ru : l.en}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 text-[13px] uppercase tracking-[0.18em]">
          {(["ru", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => onLang(l)}
              aria-pressed={lang === l}
              className={`px-2 py-1 transition-colors ${lang === l ? "text-aurum" : "text-bone/40 hover:text-bone"}`}
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="ml-3 flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-[1px] w-5 bg-bone transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-[1px] w-5 bg-bone transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Мобильное меню */}
      <div
        className={`overflow-hidden border-t hairline bg-ink/95 backdrop-blur-md transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b hairline py-4 text-sm uppercase tracking-[0.2em] text-bone/70"
              >
                {lang === "ru" ? l.ru : l.en}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
