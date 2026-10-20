import { ReservePage, reserveMetadata } from "@/pages-impl/ReservePage";

export const metadata = reserveMetadata("en");
export default function Page() {
  return <ReservePage lang="en" />;
}
