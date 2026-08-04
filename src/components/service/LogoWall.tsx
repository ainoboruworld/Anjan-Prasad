import { LogoMark } from "../brand/LogoMark";
import { Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Logo wall — the "companies worked with" band. Marks render grayscale and
 * regain colour on hover (.logo-mark). Content-driven so both service pages
 * can show the same disciplined proof strip with their own framing.
 */
export function LogoWall({
  eyebrow = "Companies worked with",
  title,
  names,
  tone = "sunken",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  names: string[];
  tone?: "sunken" | "elevated";
}) {
  return (
    <section
      aria-label="Companies worked with"
      className={`border-t border-border py-24 ${
        tone === "sunken" ? "bg-background-sunken" : "bg-background-elevated"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-[length:var(--text-section)] font-semibold tracking-[-0.02em] text-foreground">
            {title}
          </h2>
        </Reveal>

        <Reveal className="mt-14">
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {names.map((name) => (
              <li
                key={name}
                tabIndex={0}
                className="logo-mark flex items-center text-foreground"
              >
                <LogoMark name={name} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
