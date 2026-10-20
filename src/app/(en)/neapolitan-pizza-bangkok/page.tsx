import { LandingPage, landingMetadata } from "@/pages-impl/LandingPage";

export const metadata = landingMetadata("en", "pizza");
export default function Page() {
  return <LandingPage lang="en" id="pizza" />;
}
