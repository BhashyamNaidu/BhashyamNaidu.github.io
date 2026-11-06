export function Tag({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={
        tone === "accent"
          ? "inline-flex items-center rounded-md border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent"
          : "inline-flex items-center rounded-md border border-line-strong bg-white/[0.02] px-2 py-0.5 font-mono text-[11px] text-muted transition-colors"
      }
    >
      {children}
    </span>
  );
}
