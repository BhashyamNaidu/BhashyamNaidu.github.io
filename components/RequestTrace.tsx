"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Decorative, illustrative trace waterfall — styled like a distributed-tracing
 * view of one request moving through an InsightQuery-style pipeline.
 * Bar widths are relative and carry no measured timings.
 */
const spans = [
  { name: "POST /investigate", svc: "api", start: 0, len: 100, depth: 0 },
  { name: "intent.classify", svc: "router", start: 3, len: 14, depth: 1 },
  { name: "sql.generate", svc: "llm", start: 18, len: 20, depth: 1 },
  { name: "sql.validate", svc: "guard", start: 39, len: 8, depth: 2, accent: true },
  { name: "postgres.query", svc: "db", start: 48, len: 16, depth: 2 },
  { name: "pgvector.search", svc: "rag", start: 18, len: 22, depth: 1 },
  { name: "llm.summarize", svc: "llm", start: 66, len: 28, depth: 1 },
  { name: "audit.record", svc: "store", start: 95, len: 5, depth: 1 },
];

export function RequestTrace() {
  const reduce = useReducedMotion();
  const CYCLE = 7;

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-[0_40px_120px_-40px_#000] backdrop-blur"
      role="img"
      aria-label="Illustrative request trace: a question flows through intent classification, SQL generation and validation, a PostgreSQL query, vector search, LLM summarisation and audit logging."
    >
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="font-mono text-[11px] text-dim">trace · request lifecycle</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-dim">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
          live
        </span>
      </div>

      {/* timeline ruler */}
      <div className="grid grid-cols-[minmax(0,8.5rem)_1fr] gap-3 px-4 pt-4 font-mono text-[10px] text-dim sm:grid-cols-[minmax(0,10rem)_1fr]">
        <span>span</span>
        <div className="flex justify-between">
          <span>t₀</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">·</span>
          <span>t₁</span>
        </div>
      </div>

      <ul className="space-y-1.5 px-4 pb-4 pt-2">
        {spans.map((s, i) => (
          <li
            key={s.name}
            className="grid grid-cols-[minmax(0,8.5rem)_1fr] items-center gap-3 sm:grid-cols-[minmax(0,10rem)_1fr]"
          >
            <span
              className="truncate font-mono text-[11px] text-muted"
              style={{ paddingLeft: `${s.depth * 10}px` }}
            >
              {s.depth > 0 && <span className="mr-1 text-dim">└</span>}
              {s.name}
            </span>
            <div className="relative h-5 rounded-[4px] bg-white/[0.015]">
              <motion.div
                className={`absolute top-1/2 h-2.5 -translate-y-1/2 rounded-[3px] ${
                  s.accent
                    ? "bg-accent shadow-[0_0_16px_#5b8cff80]"
                    : s.depth === 0
                      ? "bg-fg/15"
                      : "bg-accent/40"
                }`}
                style={{ left: `${s.start}%`, width: `${s.len}%`, transformOrigin: "left" }}
                initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                animate={
                  reduce
                    ? { scaleX: 1, opacity: 1 }
                    : { scaleX: [0, 1, 1, 1], opacity: [0, 1, 1, 0] }
                }
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: CYCLE,
                        times: [0, 0.08, 0.85, 1],
                        delay: 0.4 + (s.start / 100) * 1.6 + i * 0.05,
                        repeat: Infinity,
                        ease: "easeOut",
                      }
                }
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-dim">
        <span>8 spans · 1 trace</span>
        <span>illustrative · not measured data</span>
      </div>
    </div>
  );
}
