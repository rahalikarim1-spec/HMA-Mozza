import { ReservePage, reserveMetadata } from "@/pages-impl/ReservePage";

export const metadata = reserveMetadata("ar");
export default function Page() {
  return <ReservePage lang="ar" />;
}
