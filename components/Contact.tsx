import { links } from "@/lib/content";
import { Button } from "./ui/Button";
import { ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

export function Contact() {
  const channels = [
    links.email && {
      label: "Email",
      value: links.email,
      href: `mailto:${links.email}`,
      icon: MailIcon,
      external: false,
    },
    {
      label: "GitHub",
      value: links.github.replace("https://", ""),
      href: links.github,
      icon: GitHubIcon,
      external: true,
    },
    links.linkedin && {
      label: "LinkedIn",
      value: links.linkedin.replace(/^https:\/\/(www\.)?/, ""),
      href: links.linkedin,
      icon: LinkedInIcon,
      external: true,
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    href: string;
    icon: typeof MailIcon;
    external: boolean;
  }[];

  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line py-24 md:py-36">
      <div aria-hidden className="bg-dotgrid mask-fade absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mb-5 flex items-center gap-3 font-mono text-xs text-dim">
            <span className="text-accent">05</span>
            <span className="h-px w-8 bg-line-strong" />
            <span className="uppercase tracking-[0.18em]">Contact</span>
          </div>
          <h2 className="max-w-4xl text-balance text-[clamp(2.4rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-fg">
            Let&apos;s build something{" "}
            <span className="font-serif font-normal italic tracking-normal text-muted">reliable.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
            I&apos;m looking for software, backend, cloud and AI engineering opportunities. If you&apos;re hiring
            or want to talk systems, I&apos;d like to hear from you.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c) => (
              <li key={c.label} className="min-w-0">
                <a
                  href={c.href}
                  {...(c.external
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                        "aria-label": `${c.label}: ${c.value} (opens in a new tab)`,
                      }
                    : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-raised text-muted transition-colors group-hover:text-fg">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-dim">{c.label}</span>
                    <span className="mt-0.5 block truncate text-fg/90">{c.value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {(links.resume || links.email) && (
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              {links.email && (
                <Button href={`mailto:${links.email}`}>
                  <MailIcon className="h-4 w-4" />
                  Say hello
                </Button>
              )}
              {links.resume && (
                <Button href={links.resume} variant="ghost" download>
                  <DownloadIcon className="h-4 w-4" />
                  Download resume
                </Button>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
