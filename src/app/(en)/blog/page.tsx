import { BlogIndexPage, companyMetadata } from "@/pages-impl/CompanyPages";

export const metadata = companyMetadata("en", "blog");
export default function Page() {
  return <BlogIndexPage lang="en" />;
}
