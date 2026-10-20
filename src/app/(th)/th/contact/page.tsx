import { ContactPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("th", "contact");
export default function Page() {
  return <ContactPage lang="th" />;
}
