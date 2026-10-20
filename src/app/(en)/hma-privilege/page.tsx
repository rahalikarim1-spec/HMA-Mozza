import { PrivilegePage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("en", "hma-privilege");
export default function Page() {
  return <PrivilegePage lang="en" />;
}
