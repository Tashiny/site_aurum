"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Counter from "@/components/Counter";
import LeadForm from "@/components/LeadForm";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import ScrollProgress from "@/components/ScrollProgress";
import SplitHeading from "@/components/SplitHeading";

type Lang = "ru" | "en";

const t = {
  ru: {
    heroLines: ["Сайты, которые", "невозможно", "пролистать"],
    heroSub:
      "Типографика, движение и интерактив вместо одинаковых блоков. Проектируем и собираем сайты, которые выглядят дорого и работают быстро.",
    cta: "Обсудить проект",
    scroll: "Листайте",
    workTitle: "Избранное",
    approachTitle: "Как мы работаем",
    numbersTitle: "В цифрах",
    contactTitle: "Расскажите о проекте",
    contactSub: "Ответим в течение дня и пришлём смету с этапами.",
    projects: [
      { n: "01", name: "Nord Ceramics", kind: "Каталог и шоурум", year: "2025", note: "Скролл-повествование о производстве, 3D-превью изделий, RU/EN." },
      { n: "02", name: "Vetka Coffee", kind: "Бренд и магазин", year: "2025", note: "Витрина с фильтрами, анимированная инфографика обжарки, оплата." },
      { n: "03", name: "Kontur Capital", kind: "Лендинг фонда", year: "2024", note: "Плотная типографическая сетка, графики на SVG, форма в Telegram." },
    ],
    steps: [
      { k: "Бриф", v: "Разбираем задачу, смотрим на конкурентов, фиксируем смысл первого экрана." },
      { k: "Структура", v: "Сценарий страницы и логика движения: что показываем, в каком порядке и зачем." },
      { k: "Сборка", v: "Next.js, компонентная система, анимации на transform — без просадки производительности." },
      { k: "Запуск", v: "Деплой на Vercel, техническое SEO, проверка на реальных устройствах." },
    ],
    stats: [
      { value: 98, suffix: "", label: "Performance в Lighthouse на мобиле" },
      { value: 14, suffix: " дн.", label: "Средний срок сборки лендинга" },
      { value: 42, suffix: "%", label: "Рост глубины просмотра после редизайна" },
    ],
  },
  en: {
    heroLines: ["Sites you", "simply cannot", "scroll past"],
    heroSub:
      "Typography, motion and interaction instead of identical blocks. We design and build sites that look expensive and load fast.",
    cta: "Start a project",
    scroll: "Scroll",
    workTitle: "Selected work",
    approachTitle: "How we work",
    numbersTitle: "In numbers",
    contactTitle: "Tell us about the project",
    contactSub: "We reply within a day with a staged estimate.",
    projects: [
      { n: "01", name: "Nord Ceramics", kind: "Catalogue & showroom", year: "2025", note: "Scroll narrative about craft, 3D previews, RU/EN." },
      { n: "02", name: "Vetka Coffee", kind: "Brand & store", year: "2025", note: "Filterable storefront, animated roast infographics, checkout." },
      { n: "03", name: "Kontur Capital", kind: "Fund landing", year: "2024", note: "Dense typographic grid, SVG charts, Telegram form." },
    ],
    steps: [
      { k: "Brief", v: "We unpack the task, review competitors and define the first screen." },
      { k: "Structure", v: "Page narrative and motion logic: what we show, in what order and why." },
      { k: "Build", v: "Next.js, component system, transform-only animations — no performance hit." },
      { k: "Launch", v: "Vercel deploy, technical SEO, testing on real devices." },
    ],
    stats: [
      { value: 98, suffix: "", label: "Mobile Lighthouse performance" },
      { value: 14, suffix: " days", label: "Average landing build time" },
      { value: 42, suffix: "%", label: "Scroll depth growth after redesign" },
    ],
  },
} as const;

export default function Page() {
  const [lang, setLang] = useState<Lang>("ru");
  const c = t[lang];
  const heroRef = useRef<HTMLElement>(null);

  // Параллакс первого экрана: тянем только transform/opacity
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <main id="top" className="relative">
      <ScrollProgress />
      <Nav lang={lang} onLang={setLang} />

      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-[100svh] items-end overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroFade }} className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_18%_8%,#1d1c17_0%,#080807_58%)]" />
          <div className="absolute -left-24 top-1/4 h-[520px] w-[520px] rounded-full bg-aurum/[0.07] blur-[130px]" />
          <div className="absolute bottom-0 right-[8%] h-[380px] w-[380px] rounded-full bg-moss/[0.10] blur-[120px]" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 md:px-10 md:pb-28">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-10 flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] text-bone/45"
          >
            <span className="h-[1px] w-10 bg-aurum" />
            {lang === "ru" ? "Дизайн-студия · Москва / удалённо" : "Design studio · Remote"}
          </motion.p>

          <SplitHeading
            lines={[...c.heroLines]}
            className="font-display text-[clamp(2.9rem,9.2vw,9rem)] font-normal leading-[0.92] tracking-tightest"
          />

          <div className="mt-14 grid gap-12 border-t hairline pt-10 md:grid-cols-12">
            <Reveal delay={0.5} className="md:col-span-5 md:col-start-7">
              <p className="max-w-xl text-lg leading-relaxed text-bone/65">{c.heroSub}</p>
              <a
                href="#contact"
                className="group mt-9 inline-flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-bone"
              >
                <span className="border-b border-aurum pb-1">{c.cta}</span>
                <span className="transition-transform group-hover:translate-x-1.5">→</span>
              </a>
            </Reveal>
          </div>
        </div>

        <motion.span
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-bone/35 md:block"
        >
          {c.scroll}
        </motion.span>
      </section>

      <Marquee />

      {/* WORK */}
      <section id="work" className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <div className="mb-16 flex items-end justify-between gap-8">
            <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] leading-none tracking-tightest">{c.workTitle}</h2>
            <span className="text-[12px] uppercase tracking-[0.28em] text-bone/40">2024 — 2025</span>
          </div>
        </Reveal>

        <div className="border-t hairline">
          {c.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <a href="#contact" className="group block border-b hairline py-9 transition-colors hover:bg-bone/[0.02]">
                <div className="grid items-baseline gap-4 md:grid-cols-12">
                  <span className="text-[12px] tracking-[0.2em] text-aurum md:col-span-1">{p.n}</span>
                  <h3 className="font-display text-3xl leading-none tracking-tight md:col-span-4 md:text-[2.6rem]">
                    {p.name}
                  </h3>
                  <span className="text-sm uppercase tracking-[0.16em] text-bone/45 md:col-span-3">{p.kind}</span>
                  <p className="text-sm leading-relaxed text-bone/55 md:col-span-3">{p.note}</p>
                  <span className="text-sm text-bone/35 transition-transform group-hover:translate-x-1 md:col-span-1 md:text-right">
                    {p.year}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" className="border-y hairline bg-graphite/60">
        <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <Reveal>
            <h2 className="mb-20 font-display text-[clamp(2rem,5vw,4.2rem)] leading-none tracking-tightest">
              {c.approachTitle}
            </h2>
          </Reveal>

          <div className="grid gap-x-10 gap-y-14 md:grid-cols-4">
            {c.steps.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.1}>
                <div className="relative pt-7">
                  <span className="absolute left-0 top-0 h-[2px] w-9 bg-aurum" />
                  <span className="mb-4 block text-[12px] uppercase tracking-[0.28em] text-bone/40">
                    0{i + 1}
                  </span>
                  <h3 className="mb-3 font-display text-2xl tracking-tight">{s.k}</h3>
                  <p className="text-sm leading-relaxed text-bone/55">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NUMBERS */}
      <section id="numbers" className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <h2 className="mb-20 font-display text-[clamp(2rem,5vw,4.2rem)] leading-none tracking-tightest">
            {c.numbersTitle}
          </h2>
        </Reveal>

        <div className="grid gap-14 md:grid-cols-3">
          {c.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div className="border-t hairline pt-8">
                <div className="font-display text-[clamp(3.4rem,7vw,6rem)] leading-none tracking-tightest text-bone">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-bone/50">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t hairline bg-graphite/60">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[0.95] tracking-tightest">
              {c.contactTitle}
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-bone/60">{c.contactSub}</p>
            <p className="mt-12 text-sm uppercase tracking-[0.2em] text-bone/40">hello@aurum.studio</p>
          </Reveal>

          <Reveal delay={0.12}>
            <LeadForm lang={lang} />
          </Reveal>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 px-6 py-10 text-[12px] uppercase tracking-[0.2em] text-bone/35 md:flex-row md:px-10">
        <span>Aurum Studio © {new Date().getFullYear()}</span>
        <span>Next.js · Vercel</span>
      </footer>
    </main>
  );
}
