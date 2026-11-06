"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { links } from "@/lib/content";
import { CloseIcon, GitHubIcon, LinkedInIcon, MenuIcon } from "./ui/Icons";

const items = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const hero = document.getElementById("top");
    if (hero) observer.observe(hero);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line/80 bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="group flex items-center gap-2.5 font-mono text-sm" aria-label="Back to top">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-line-strong bg-raised text-[11px] font-semibold text-fg transition-colors group-hover:border-accent/60">
            bn
          </span>
          <span className="hidden text-muted transition-colors group-hover:text-fg sm:inline">bhashyam.naidu</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={active === it.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === it.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {active === it.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-white/[0.04]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {it.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
          >
            <GitHubIcon className="h-[18px] w-[18px]" />
          </a>
          {links.linkedin && (
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
            >
              <LinkedInIcon className="h-[17px] w-[17px]" />
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-line-strong text-fg md:hidden"
          >
            {open ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
              {items.map((it, i) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      document.body.style.overflow = "";
                      // Wait for the scroll lock to release before jumping.
                      requestAnimationFrame(() => {
                        document.getElementById(it.id)?.scrollIntoView({ block: "start" });
                        history.replaceState(null, "", `#${it.id}`);
                      });
                    }}
                    className="flex items-center justify-between border-b border-line/60 py-4 text-lg text-fg last:border-0"
                  >
                    {it.label}
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
