import HomePage, { homeMetadata } from "@/pages-impl/HomePage";

export const metadata = homeMetadata("en");
export default function Page() {
  return <HomePage lang="en" />;
}
