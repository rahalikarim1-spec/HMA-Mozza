import MenuPage, { menuMetadata } from "@/pages-impl/MenuPage";

export const metadata = menuMetadata("en");
export default function Page() {
  return <MenuPage lang="en" />;
}
