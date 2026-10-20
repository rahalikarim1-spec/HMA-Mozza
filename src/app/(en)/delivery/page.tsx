import { DeliveryPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("en", "delivery");
export default function Page() {
  return <DeliveryPage lang="en" />;
}
