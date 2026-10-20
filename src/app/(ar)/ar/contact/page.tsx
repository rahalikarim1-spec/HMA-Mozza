import { ContactPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("ar", "contact");
export default function Page() {
  return <ContactPage lang="ar" />;
}
