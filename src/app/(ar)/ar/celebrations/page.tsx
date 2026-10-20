import { LandingPage, landingMetadata } from "@/pages-impl/LandingPage";

export const metadata = landingMetadata("ar", "celebrations");
export default function Page() {
  return <LandingPage lang="ar" id="celebrations" />;
}
