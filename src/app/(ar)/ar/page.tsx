import HomePage, { homeMetadata } from "@/pages-impl/HomePage";

export const metadata = homeMetadata("ar");
export default function Page() {
  return <HomePage lang="ar" />;
}
