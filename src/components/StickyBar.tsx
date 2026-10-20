import type { Dict } from "@/content/dict";
import type { BranchSlug, Lang } from "@/content/types";
import { bookingUrlFor, directionsUrl, getBranch, LINE_URL, whatsappUrl } from "@/config/site";
import { pathFor } from "@/lib/routes";
import Icon from "./Icon";
import TrackedLink from "./TrackedLink";

/**
 * Mobile sticky bottom bar on every page: Reserve / WhatsApp / LINE / Directions.
 * Order: EN & AR -> WhatsApp first; TH -> LINE first. (RTL mirrors automatically.)
 * On branch pages Reserve + Directions + the WhatsApp message are pre-set to that branch.
 */
export default function StickyBar({
  lang,
  d,
  branch,
}: {
  lang: Lang;
  d: Dict;
  branch?: BranchSlug;
}) {
  const b = branch ? getBranch(branch) : undefined;
  const place = b ? b.name : "Mozza Bangkok";
  const params = { branch: branch ?? ("any" as const), language: lang };

  const items = {
    reserve: (
      <TrackedLink
        key="reserve"
        href={bookingUrlFor(branch)}
        event="reservation_click"
        params={params}
        className="bg-tomato text-cream"
      >
        <Icon name="calendar" />
        {d.sticky.reserve}
      </TrackedLink>
    ),
    whatsapp: (
      <TrackedLink
        key="whatsapp"
        href={whatsappUrl(d.whatsappMessage(place))}
        external
        event="whatsapp_click"
        params={params}
        className="bg-cream text-ink"
      >
        <Icon name="whatsapp" />
        {d.sticky.whatsapp}
      </TrackedLink>
    ),
    line: (
      <TrackedLink
        key="line"
        href={LINE_URL}
        event="line_click"
        params={params}
        className="bg-cream text-ink"
      >
        <Icon name="line" />
        {d.sticky.line}
      </TrackedLink>
    ),
    directions: (
      <TrackedLink
        key="directions"
        href={b ? directionsUrl(b) : pathFor(lang, "locations")}
        external={Boolean(b)}
        event="directions_click"
        params={params}
        className="bg-cream text-ink"
      >
        <Icon name="pin" />
        {d.sticky.directions}
      </TrackedLink>
    ),
  };

  const order =
    lang === "th"
      ? [items.line, items.reserve, items.whatsapp, items.directions]
      : [items.whatsapp, items.reserve, items.line, items.directions];

  return (
    <nav
      aria-label={d.sticky.label}
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-ink pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4 gap-px">
        {order.map((item, i) => (
          <li key={i} className="flex [&>a]:flex [&>a]:min-h-14 [&>a]:w-full [&>a]:flex-col [&>a]:items-center [&>a]:justify-center [&>a]:gap-0.5 [&>a]:px-1 [&>a]:text-[11px] [&>a]:font-semibold [&>a]:leading-tight">
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
