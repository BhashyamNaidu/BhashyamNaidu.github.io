import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  label,
  title,
  accent,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  accent?: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="mb-5 flex items-center gap-3 font-mono text-xs text-dim">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span className="uppercase tracking-[0.18em]">{label}</span>
      </div>
      <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl md:text-5xl">
        {title}{" "}
        {accent && (
          <span className="font-serif text-[1.08em] font-normal italic tracking-normal text-muted">
            {accent}
          </span>
        )}
      </h2>
      {intro && (
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">{intro}</p>
      )}
    </Reveal>
  );
}
