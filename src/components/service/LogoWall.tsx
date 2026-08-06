import type { BrandLogo } from "@/lib/brandLogos";
import { LogoRow } from "../ui/LogoPlaceholder";
import { Eyebrow } from "../ui/Primitives";
import { Reveal } from "../ui/Reveal";

/**
 * Logo wall - the "companies worked with" proof band. Renders the official
 * brand artwork on uniform white chips (the same tile used on the home wall),
 * so sizing, spacing, and alignment stay identical everywhere and the strip
 * reads clean and premium in both Light and Dark modes.
 */
export function LogoWall({
  eyebrow = "Companies worked with",
  title,
  logos,
  tone = "sunken",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  logos: BrandLogo[];
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

        <LogoRow logos={logos} className="mt-14" />
      </div>
    </section>
  );
}
