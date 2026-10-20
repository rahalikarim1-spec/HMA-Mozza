import MenuPage, { menuMetadata } from "@/pages-impl/MenuPage";

export const metadata = menuMetadata("th");
export default function Page() {
  return <MenuPage lang="th" />;
}
