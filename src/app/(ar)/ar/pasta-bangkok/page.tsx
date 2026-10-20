import { LandingPage, landingMetadata } from "@/pages-impl/LandingPage";

export const metadata = landingMetadata("ar", "pasta");
export default function Page() {
  return <LandingPage lang="ar" id="pasta" />;
}
