const items = ["Typography", "Motion", "Infographics", "Core Web Vitals", "RU / EN", "Interaction"];

export default function Marquee() {
  return (
    <div className="border-y hairline py-5" aria-hidden>
      <div className="flex w-max animate-marquee gap-14 will-change-transform">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-14 whitespace-nowrap text-[13px] uppercase tracking-[0.3em] text-bone/35"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-aurum/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
