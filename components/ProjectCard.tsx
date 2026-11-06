"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/content";
import { ArchitectureDiagram } from "./diagrams/ArchitectureDiagram";
import { ArrowUpRight, GitHubIcon, PlusIcon } from "./ui/Icons";
import { Tag } from "./ui/Tag";

export function ProjectCard({ project, figure }: { project: Project; figure: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `${project.slug}-case-study`;

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      id={project.slug}
      onMouseMove={onMove}
      className="spotlight group rounded-3xl border border-line bg-surface/60 transition-colors duration-300 hover:border-line-strong"
    >
      {/* header strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4 md:px-8">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-accent">{project.index}</span>
          <span className="text-dim">/</span>
          <span className="text-muted">{project.slug}</span>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
          {project.category.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className="grid gap-10 p-6 md:p-8 lg:grid-cols-[0.85fr_1.4fr] lg:gap-10">
        {/* copy */}
        <div className="flex min-w-0 flex-col">
          <h3 className="text-3xl font-semibold tracking-[-0.03em] text-fg md:text-4xl">{project.name}</h3>
          <p className="mt-4 text-pretty leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-6 border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-fg/85">
            {project.highlight}
          </div>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.stack.map((s) => (
              <li key={s}>
                <Tag>{s}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-fg transition-colors hover:border-accent/60 hover:bg-accent-soft"
            >
              <PlusIcon className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
              {open ? "Close case study" : "Read case study"}
            </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} source code on GitHub (opens in a new tab)`}
                className="group/link inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:text-fg"
              >
                <GitHubIcon className="h-4 w-4" />
                Source
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} public case study (opens in a new tab)`}
                className="group/link inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:text-fg"
              >
                Live showcase
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* figure */}
        <figure className="flex min-w-0 flex-col">
          <div className="relative flex flex-1 items-center overflow-hidden rounded-2xl border border-line bg-bg">
            <div aria-hidden className="bg-dotgrid absolute inset-0 opacity-60" />
            <div className="relative w-full overflow-x-auto px-2 py-6 sm:px-4">
              <div className="min-w-[560px]">
                <ArchitectureDiagram project={project} />
              </div>
            </div>
          </div>
          <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[10px] text-dim">
            <span>
              fig.{figure} — conceptual architecture<span className="sm:hidden"> · illustrative</span>
            </span>
            <span className="hidden text-right sm:inline">illustrative · not a product screenshot</span>
            <span aria-hidden className="text-right sm:hidden">scroll →</span>
          </figcaption>
        </figure>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 border-t border-line p-6 md:grid-cols-2 md:p-8">
              <div>
                <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Capabilities</h4>
                <ul className="space-y-3">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed text-fg/85">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent/80" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Design decisions</h4>
                <ol className="space-y-6">
                  {project.engineeringNotes.map((n, i) => (
                    <li key={n.title} className="grid grid-cols-[2rem_1fr]">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="text-sm font-medium text-fg">{n.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{n.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
