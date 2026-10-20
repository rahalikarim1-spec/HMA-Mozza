import { BlogPostPage, blogPostMetadata } from "@/pages-impl/CompanyPages";
import { asBlogSlug, BLOG_PARAMS } from "@/lib/params";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return BLOG_PARAMS;
}
export async function generateMetadata({ params }: Props) {
  return blogPostMetadata("ar", asBlogSlug((await params).slug));
}
export default async function Page({ params }: Props) {
  return <BlogPostPage lang="ar" slug={asBlogSlug((await params).slug)} />;
}
