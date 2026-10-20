import Image from "next/image";
import Link from "next/link";
import type { Dict } from "@/content/dict";
import type { Lang } from "@/content/types";
import { bookingUrlFor, directionsUrl, type BranchConfig } from "@/config/site";
import { openStatus } from "@/lib/format";
import { pathFor } from "@/lib/routes";
import { btnLight, btnPrimary } from "@/lib/ui";
import Icon from "./Icon";
import TrackedLink from "./TrackedLink";

export default function BranchCard({
  branch,
  d,
  lang,
  headingLevel = 3,
}: {
  branch: BranchConfig;
  d: Dict;
  lang: Lang;
  headingLevel?: 2 | 3;
}) {
  const H = `h${headingLevel}` as const;
  const t = d.branches[branch.slug];
  const params = { branch: branch.slug, language: lang } as const;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm bg-cream">
      <Image
        src={branch.image}
        alt={t.imageAlt}
        width={1200}
        height={900}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <H className="text-2xl">
          <Link href={pathFor(lang, `locations/${branch.slug}`)} className="hover:underline">
            {branch.name}
          </Link>
        </H>
        <p className="mt-1 text-sm font-semibold">{t.mall} · {t.district}</p>
        <p className="mt-2 flex items-center gap-2 text-sm">
          <Icon name="clock" className="h-4 w-4" />
          {openStatus(branch, d)}
        </p>
        <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
          <TrackedLink
            href={directionsUrl(branch)}
            external
            event="directions_click"
            params={params}
            className={btnLight}
          >
            <Icon name="pin" className="h-4 w-4" />
            {d.common.directions}
          </TrackedLink>
          <TrackedLink
            href={bookingUrlFor(branch.slug)}
            event="reservation_click"
            params={params}
            className={btnPrimary}
          >
            {d.common.reserve}
          </TrackedLink>
        </div>
        <Link
          href={pathFor(lang, `locations/${branch.slug}`)}
          className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-tomato underline-offset-4 hover:underline"
        >
          {d.common.viewBranch}
          <Icon name="arrow" className="h-4 w-4" mirror />
        </Link>
      </div>
    </article>
  );
}
