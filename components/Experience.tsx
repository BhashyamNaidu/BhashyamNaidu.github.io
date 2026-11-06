import { timeline } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { Tag } from "./ui/Tag";

export function Experience() {
  return (
    <section id="experience" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="04" label="Experience & education" title="Where I've" accent="learned and shipped." />

        <ol className="relative ml-1.5 border-l border-line md:ml-0 md:border-0">
          {timeline.map((t, i) => (
            <li key={t.org} className="relative pb-14 pl-8 last:pb-0 md:grid md:grid-cols-[13rem_1fr] md:gap-12 md:pl-0">
              {/* desktop rail */}
              <span aria-hidden className="absolute bottom-0 left-[13rem] top-0 hidden w-px translate-x-6 bg-line md:block" />
              {/* node */}
              <span
                aria-hidden
                className={`absolute left-0 top-1.5 h-3 w-3 -translate-x-[calc(50%+0.5px)] rounded-full border-2 border-bg md:left-[13rem] md:translate-x-[calc(1.5rem-50%)] ${
                  i === 0 ? "bg-accent shadow-[0_0_0_4px_#5b8cff22]" : "bg-line-strong"
                }`}
              />

              <Reveal className="mb-3 md:mb-0 md:pt-0.5 md:text-right">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{t.kind}</p>
                {t.period && <p className="mt-2 font-mono text-sm text-muted">{t.period}</p>}
              </Reveal>

              <Reveal delay={0.05} className="md:pl-12">
                <div className="rounded-2xl border border-line bg-surface/50 p-6 transition-colors hover:border-line-strong md:p-7">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg">{t.role}</h3>
                  <p className="mt-1 text-muted">
                    {t.org}
                    {t.location && <span className="text-dim"> · {t.location}</span>}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                        <span className="mt-[9px] h-px w-3 shrink-0 bg-dim" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {t.tags && (
                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {t.tags.map((s) => (
                        <li key={s}>
                          <Tag>{s}</Tag>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
