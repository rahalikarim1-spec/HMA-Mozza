import { ContactPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("en", "contact");
export default function Page() {
  return <ContactPage lang="en" />;
}
