import { AboutPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("en", "about");
export default function Page() {
  return <AboutPage lang="en" />;
}
