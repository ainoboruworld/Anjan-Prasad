export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24 sm:px-10">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Anjan Prasad
        </span>

        <h1 className="mt-6 max-w-3xl text-[length:var(--text-display)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
          Strategy and advisory for teams shaping what comes next.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
          A clean slate, ready for the work ahead. The design system,
          typography, and theme tokens are in place — build from here.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center rounded-[var(--radius-lg)] bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-primary-hover"
          >
            Get started
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-[var(--radius-lg)] border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Learn more
          </a>
        </div>
      </div>
    </main>
  );
}
