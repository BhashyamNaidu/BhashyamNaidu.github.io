import { links, openTo, site } from "@/lib/content";
import { Button } from "./ui/Button";
import { ArrowRight, GitHubIcon, LinkedInIcon, MailIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { RequestTrace } from "./RequestTrace";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      {/* background: dot grid + one restrained glow */}
      <div aria-hidden className="bg-dotgrid mask-fade absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-18rem] -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <Reveal>
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.02] py-1 pl-2 pr-3.5 font-mono text-[11px] text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to SWE · Backend · Cloud roles
              <span className="hidden sm:inline">— Class of 2027</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-fg">
              Bhashyam
              <br />
              <span className="text-fg/90">Naidu</span>
              <span className="text-accent">.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 font-mono text-sm text-muted">
              <span className="text-dim">~/</span>
              {site.title.toLowerCase().replace(/ & /g, "+").replace(/ /g, "-")}
              <span className="text-dim"> · </span>
              {site.subtitle.toLowerCase().replace(/ /g, "-")}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
              I build <span className="text-fg">scalable backend systems</span>,{" "}
              <span className="text-fg">cloud-native applications</span> and{" "}
              <span className="font-serif text-[1.12em] italic text-fg">intelligent software solutions</span> that
              solve real-world problems.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="#projects">
                View projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href="#contact" variant="ghost">
                Contact me
              </Button>
              <div className="ml-1 flex items-center gap-1">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>
                {links.linkedin && (
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                  >
                    <LinkedInIcon className="h-[19px] w-[19px]" />
                  </a>
                )}
                {links.email && (
                  <a
                    href={`mailto:${links.email}`}
                    aria-label="Send email"
                    className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
                  >
                    <MailIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25} className="relative">
          <RequestTrace />
          <p className="mt-3 text-right font-mono text-[10px] text-dim">
            fig.0 — one question, traced through an InsightQuery-style pipeline
          </p>
        </Reveal>
      </div>

      {/* interests strip */}
      <div className="mx-auto mt-20 max-w-6xl px-5 md:mt-28 md:px-8">
        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-8">
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Exploring</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {openTo.map((o) => (
              <li key={o} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent/70" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
