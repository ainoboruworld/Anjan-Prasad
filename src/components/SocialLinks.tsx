import { SOCIAL_ICON_PATHS } from "./brand/socialIconPaths";
import { SOCIALS } from "@/lib/data";

const ICONS = new Map(SOCIAL_ICON_PATHS.map((i) => [i.name, i]));

/** Official social profiles — used in the footer and on Contact. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map((s) => {
        const icon = ICONS.get(s.name);
        if (!icon) return null;
        const pending = s.href === "#";
        return (
          <li key={s.name}>
            <a
              href={s.href}
              {...(pending
                ? { "aria-disabled": true, tabIndex: -1 }
                : { target: "_blank", rel: "noopener noreferrer" })}
              aria-label={pending ? `${s.name} — link coming soon` : s.name}
              title={pending ? `${s.name} — coming soon` : s.name}
              className={`flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-all duration-300 ${
                pending
                  ? "cursor-default opacity-60"
                  : "hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
              }`}
            >
              <svg viewBox={icon.viewBox} className="h-[17px] w-[17px]" fill="currentColor" aria-hidden>
                <path d={icon.path} />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
