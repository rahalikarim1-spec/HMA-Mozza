import { AboutPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("ar", "about");
export default function Page() {
  return <AboutPage lang="ar" />;
}
