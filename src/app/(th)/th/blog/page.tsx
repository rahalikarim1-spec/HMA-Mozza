import { BlogIndexPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("th", "blog");
export default function Page() {
  return <BlogIndexPage lang="th" />;
}
