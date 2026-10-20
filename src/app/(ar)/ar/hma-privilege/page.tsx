import { PrivilegePage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("ar", "hma-privilege");
export default function Page() {
  return <PrivilegePage lang="ar" />;
}
