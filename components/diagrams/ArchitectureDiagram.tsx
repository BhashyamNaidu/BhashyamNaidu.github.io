"use client";

import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/content";

const NODE_H = 46;
const R = 8;

const C = {
  surface: "#111115",
  line: "#2c2c34",
  edge: "#3a3a44",
  fg: "#ededeb",
  dim: "#85858f",
  accent: "#5b8cff",
};

type Pt = { x: number; y: number };

function route(a: Pt, b: Pt, w: number): { d: string; label: Pt } {
  // Same column → vertical connector.
  if (Math.abs(a.x - b.x) < 4) {
    const x = a.x + w / 2;
    const down = b.y > a.y;
    const sy = down ? a.y + NODE_H : a.y;
    const ey = down ? b.y : b.y + NODE_H;
    return { d: `M ${x} ${sy} V ${ey}`, label: { x: x + 8, y: (sy + ey) / 2 + 3 } };
  }
  const sx = a.x + w;
  const sy = a.y + NODE_H / 2;
  const ex = b.x;
  const ey = b.y + NODE_H / 2;
  if (Math.abs(sy - ey) < 1) {
    return { d: `M ${sx} ${sy} H ${ex}`, label: { x: (sx + ex) / 2, y: sy - 7 } };
  }
  const mx = (sx + ex) / 2;
  const dir = ey > sy ? 1 : -1;
  const d = [
    `M ${sx} ${sy}`,
    `H ${mx - R}`,
    `Q ${mx} ${sy} ${mx} ${sy + dir * R}`,
    `V ${ey - dir * R}`,
    `Q ${mx} ${ey} ${mx + R} ${ey}`,
    `H ${ex}`,
  ].join(" ");
  return { d, label: { x: mx + 6, y: (sy + ey) / 2 + 3 } };
}

export function ArchitectureDiagram({ project }: { project: Project }) {
  const { diagram } = project;
  const uid = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const w = diagram.nodeWidth;

  return (
    <svg
      viewBox={`0 0 ${diagram.width} ${diagram.height}`}
      className="h-auto w-full"
      role="img"
      aria-labelledby={`${uid}-t`}
    >
      <title id={`${uid}-t`}>
        {`Conceptual architecture of ${project.name}: ${diagram.edges
          .map((e) => `${byId[e.from].label} to ${byId[e.to].label}`)
          .join(", ")}.`}
      </title>
      <defs>
        <marker id={`${uid}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0.5 L7 4 L0 7.5" fill="none" stroke={C.edge} strokeWidth="1.2" />
        </marker>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor={C.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {diagram.boundary && (
        <g>
          <rect
            x={diagram.boundary.x}
            y={diagram.boundary.y}
            width={diagram.boundary.w}
            height={diagram.boundary.h}
            rx={14}
            fill="none"
            stroke={C.line}
            strokeDasharray="3 5"
          />
          <text
            x={diagram.boundary.x + diagram.boundary.w - 12}
            y={diagram.boundary.y + diagram.boundary.h - 10}
            textAnchor="end"
            fontFamily="var(--font-geist-mono)"
            fontSize="10"
            fill={C.dim}
          >
            {diagram.boundary.label}
          </text>
        </g>
      )}

      {/* edges */}
      {diagram.edges.map((e, i) => {
        const { d, label } = route(byId[e.from], byId[e.to], w);
        return (
          <g key={`${e.from}-${e.to}`}>
            <path d={d} fill="none" stroke={C.edge} strokeWidth="1.2" markerEnd={`url(#${uid}-arrow)`} />
            <path
              d={d}
              fill="none"
              stroke={C.accent}
              strokeOpacity="0.35"
              strokeWidth="1.2"
              strokeDasharray="2 8"
              className="animate-flow"
            />
            {!reduce && (
              <circle r="2.6" fill={C.accent}>
                <animateMotion dur="2.8s" begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
            {e.label && (
              <text
                x={label.x}
                y={label.y}
                textAnchor={label.x === (byId[e.from].x + w + byId[e.to].x) / 2 ? "middle" : "start"}
                fontFamily="var(--font-geist-mono)"
                fontSize="9.5"
                fill={C.dim}
              >
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {/* nodes */}
      {diagram.nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y}
            width={w}
            height={NODE_H}
            rx={9}
            fill={C.surface}
            stroke={n.accent ? `${C.accent}99` : C.line}
          />
          {n.accent && (
            <>
              <circle cx={n.x + w - 11} cy={n.y + 11} r="6" fill={`url(#${uid}-glow)`} opacity="0.5" />
              <circle cx={n.x + w - 11} cy={n.y + 11} r="2.2" fill={C.accent} />
            </>
          )}
          <text x={n.x + 12} y={n.y + 20} fontFamily="var(--font-geist-sans)" fontSize="13" fontWeight="600" fill={C.fg}>
            {n.label}
          </text>
          {n.sub && (
            <text x={n.x + 12} y={n.y + 35} fontFamily="var(--font-geist-mono)" fontSize="10" fill={C.dim}>
              {n.sub}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
