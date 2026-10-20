import { LandingPage, landingMetadata } from "@/pages-impl/LandingPage";

export const metadata = landingMetadata("en", "celebrations");
export default function Page() {
  return <LandingPage lang="en" id="celebrations" />;
}
