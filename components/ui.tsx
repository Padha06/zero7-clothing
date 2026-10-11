import Link from "next/link";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("label block", className)}>{children}</span>;
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent",
        className
      )}
    >
      <span className="link-underline">{children}</span>
      <svg
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
        className="transition-transform duration-500 ease-smooth group-hover:translate-x-1"
      >
        <path d="M0 4.5h14M10 1l3.5 3.5L10 8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </Link>
  );
}

export function Badge({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "accent" | "paper";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em]",
        tone === "ink" && "bg-ink text-paper",
        tone === "accent" && "bg-accent text-paper",
        tone === "paper" && "bg-paper/90 text-ink backdrop-blur-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  href,
  onClick,
  variant = "ink",
  className,
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "ink" | "outline" | "paper";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-smooth disabled:cursor-not-allowed disabled:opacity-40",
    variant === "ink" && "bg-ink text-paper hover:bg-accent",
    variant === "paper" && "bg-paper text-ink hover:bg-accent hover:text-paper",
    variant === "outline" &&
      "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
    className
  );
  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}

export function Rule({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-line", className)} />;
}

export function PageHero({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line pb-8 pt-28 sm:pb-16 sm:pt-44">
      <Container>
        <Kicker>{kicker}</Kicker>
        <div className="mt-4 sm:mt-5 grid gap-4 sm:gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl leading-[0.96] tracking-tight">
            {title}
          </h1>
          {intro && (
            <p className="max-w-md text-[0.92rem] sm:text-[0.98rem] leading-relaxed text-ink2 lg:pb-2">{intro}</p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}
