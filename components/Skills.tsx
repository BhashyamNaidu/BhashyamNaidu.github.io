import { skills } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="03"
          label="Toolkit"
          title="The stack I work in,"
          accent="layer by layer."
          intro="No percentages, no star ratings — just the tools and fundamentals I use and can reason about in depth."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={(i % 3) * 0.05} className="bg-bg">
              <div className="group h-full p-6 transition-colors duration-300 hover:bg-surface md:p-7">
                <div className="mb-6 flex items-baseline justify-between">
                  <h3 className="text-lg font-medium tracking-[-0.01em] text-fg">{g.group}</h3>
                  <span className="font-mono text-[11px] text-dim transition-colors group-hover:text-accent">
                    L{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-lg border border-line-strong bg-white/[0.015] px-2.5 py-1 text-[13px] text-muted transition-colors duration-200 hover:border-accent/50 hover:text-fg"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
