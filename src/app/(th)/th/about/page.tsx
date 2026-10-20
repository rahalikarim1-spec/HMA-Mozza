import { AboutPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("th", "about");
export default function Page() {
  return <AboutPage lang="th" />;
}
