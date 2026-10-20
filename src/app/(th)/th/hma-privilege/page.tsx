import { PrivilegePage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("th", "hma-privilege");
export default function Page() {
  return <PrivilegePage lang="th" />;
}
