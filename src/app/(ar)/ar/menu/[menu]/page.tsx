import { MenuDetailPage, menuMetadata } from "@/pages-impl/MenuPages";
import { asMenuIdOr404, MENU_PARAMS } from "@/lib/params";

type Props = { params: Promise<{ menu: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return MENU_PARAMS;
}
export async function generateMetadata({ params }: Props) {
  return menuMetadata("ar", asMenuIdOr404((await params).menu));
}
export default async function Page({ params }: Props) {
  return <MenuDetailPage lang="ar" id={asMenuIdOr404((await params).menu)} />;
}
