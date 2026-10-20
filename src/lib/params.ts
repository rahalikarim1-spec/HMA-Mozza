import { notFound } from "next/navigation";
import { BRANCHES } from "@/config/site";
import type { BranchSlug } from "@/content/types";

export const BRANCH_SLUGS = BRANCHES.map((b) => b.slug);
/** generateStaticParams for every `locations/[slug]` route (same list in all languages). */
export const EN_BRANCH_PARAMS = BRANCH_SLUGS.map((slug) => ({ slug }));

export function asBranchSlug(value: string): BranchSlug {
  if ((BRANCH_SLUGS as string[]).includes(value)) return value as BranchSlug;
  notFound();
}
