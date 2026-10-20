import { LandingPage, landingMetadata } from "@/pages-impl/LandingPage";

export const metadata = landingMetadata("en", "pasta");
export default function Page() {
  return <LandingPage lang="en" id="pasta" />;
}
