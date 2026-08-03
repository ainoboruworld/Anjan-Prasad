import Image from "next/image";
import type { BrandLogo as Brand } from "@/lib/brandLogos";

/**
 * A single official brand logo on a uniform light chip. The chip normalises
 * the mixed backgrounds of the source artwork so logos read cleanly in both
 * themes; grayscale by default, full colour and a soft lift on hover.
 */
export function BrandLogo({
  logo,
  className = "",
}: {
  logo: Brand;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-border bg-white/95 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      <Image
        src={`/brand-logos/${logo.file}`}
        alt={`${logo.name} logo`}
        fill
        sizes="(max-width: 640px) 40vw, 180px"
        className="object-contain p-5 grayscale transition-[filter,transform] duration-300 group-hover:scale-[1.03] group-hover:grayscale-0"
      />
    </div>
  );
}
