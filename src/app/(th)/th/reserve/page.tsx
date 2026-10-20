import { ReservePage, reserveMetadata } from "@/pages-impl/ReservePage";

export const metadata = reserveMetadata("th");
export default function Page() {
  return <ReservePage lang="th" />;
}
