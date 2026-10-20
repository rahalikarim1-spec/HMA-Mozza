import { LandingPage, landingMetadata } from "@/pages-impl/LandingPage";

export const metadata = landingMetadata("th", "pasta");
export default function Page() {
  return <LandingPage lang="th" id="pasta" />;
}
