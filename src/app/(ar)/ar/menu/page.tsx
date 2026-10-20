import MenuPage, { menuMetadata } from "@/pages-impl/MenuPage";

export const metadata = menuMetadata("ar");
export default function Page() {
  return <MenuPage lang="ar" />;
}
