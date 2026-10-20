import { BlogIndexPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("ar", "blog");
export default function Page() {
  return <BlogIndexPage lang="ar" />;
}
