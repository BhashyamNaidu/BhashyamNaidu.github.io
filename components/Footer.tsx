import { links, site } from "@/lib/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { href: links.github, label: "GitHub", Icon: GitHubIcon, external: true },
    links.linkedin && { href: links.linkedin, label: "LinkedIn", Icon: LinkedInIcon, external: true },
    links.email && { href: `mailto:${links.email}`, label: "Email", Icon: MailIcon, external: false },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof GitHubIcon; external: boolean }[];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="font-mono text-xs text-dim">
          <span className="text-muted">© {year} {site.name}</span>
          <span className="mx-2">·</span>
          <span>Built with Next.js, TypeScript &amp; Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-1">
          {social.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
            >
              <Icon className="h-[17px] w-[17px]" />
            </a>
          ))}
          {links.resume && (
            <a
              href={links.resume}
              download=""
              className="ml-2 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-muted/60 hover:text-fg"
            >
              resume.pdf
            </a>
          )}
          <a
            href="#top"
            className="ml-2 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-muted/60 hover:text-fg"
          >
            ↑ top
          </a>
        </div>
      </div>
    </footer>
  );
}
