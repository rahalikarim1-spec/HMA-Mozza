import BranchPage, { branchMetadata } from "@/pages-impl/BranchPage";
import { asBranchSlug, EN_BRANCH_PARAMS } from "@/lib/params";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return EN_BRANCH_PARAMS;
}
export async function generateMetadata({ params }: Props) {
  return branchMetadata("th", asBranchSlug((await params).slug));
}
export default async function Page({ params }: Props) {
  return <BranchPage lang="th" slug={asBranchSlug((await params).slug)} />;
}
