import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const display = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });

const site = "https://aurum-studio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Aurum — дизайн-студия сайтов с характером",
  description:
    "Собираем сайты с сильной типографикой, анимациями и интерактивом. Next.js, Core Web Vitals в зелёной зоне, RU/EN.",
  keywords: ["дизайн сайтов", "Next.js разработка", "анимации на скролле", "лендинг под ключ"],
  alternates: { canonical: "/", languages: { "ru-RU": "/", "en-US": "/en" } },
  openGraph: {
    type: "website",
    url: site,
    siteName: "Aurum Studio",
    title: "Aurum — дизайн-студия сайтов с характером",
    description: "Сайты с сильной типографикой, анимациями и интерактивом.",
    locale: "ru_RU",
  },
  twitter: { card: "summary_large_image", title: "Aurum Studio" },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Aurum Studio",
  url: site,
  description: "Дизайн и разработка сайтов с сильной типографикой и анимациями.",
  areaServed: "Worldwide",
  serviceType: "Web design and development",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable}`}>
      <body className="grain font-sans antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </body>
    </html>
  );
}
