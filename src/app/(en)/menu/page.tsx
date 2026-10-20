import { MenuHubPage, menuHubMetadata } from "@/pages-impl/MenuPages";

export const metadata = menuHubMetadata("en");
export default function Page() {
  return <MenuHubPage lang="en" />;
}
