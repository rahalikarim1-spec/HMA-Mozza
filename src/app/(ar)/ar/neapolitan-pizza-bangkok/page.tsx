import { LandingPage, landingMetadata } from "@/pages-impl/LandingPage";

export const metadata = landingMetadata("ar", "pizza");
export default function Page() {
  return <LandingPage lang="ar" id="pizza" />;
}
