import HomePage, { homeMetadata } from "@/pages-impl/HomePage";

export const metadata = homeMetadata("th");
export default function Page() {
  return <HomePage lang="th" />;
}
