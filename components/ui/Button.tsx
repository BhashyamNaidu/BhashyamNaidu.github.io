type Variant = "primary" | "ghost";

const base =
  "group inline-flex h-11 select-none items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-200";
const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-white shadow-[0_0_0_1px_#ffffff20,0_8px_30px_-12px_#5b8cff80] hover:shadow-[0_0_0_1px_#ffffff40,0_10px_40px_-10px_#5b8cffaa]",
  ghost:
    "border border-line-strong text-fg/90 hover:border-muted/60 hover:bg-white/[0.03] hover:text-fg",
};

export function Button({
  href,
  variant = "primary",
  children,
  external,
  download,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
    >
      {children}
    </a>
  );
}
