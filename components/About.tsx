import { about } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="01" label="About" title="Engineering the parts" accent="you don't see." />

        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-pretty text-xl leading-relaxed text-fg md:text-2xl md:leading-[1.5]">
              {about.lead}{" "}
              <span className="font-serif italic text-muted">{about.leadAccent}</span>
            </p>
            <div className="mt-8 space-y-5 text-pretty leading-relaxed text-muted">
              {about.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface/60">
              <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[11px] text-dim">
                <span>profile.yaml</span>
                <span>read-only</span>
              </div>
              <dl className="divide-y divide-line font-mono text-[13px]">
                {about.facts.map((f) => (
                  <div key={f.k} className="grid grid-cols-[7.5rem_1fr] gap-3 px-5 py-3.5">
                    <dt className="text-dim">{f.k}:</dt>
                    <dd className="text-fg/90">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {about.highlights.map((h, i) => (
            <Reveal key={h.label} delay={i * 0.06} className="bg-bg">
              <div className="group h-full p-6 transition-colors hover:bg-surface md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">{h.label}</p>
                <p className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-fg">
                  {h.value}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{h.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
