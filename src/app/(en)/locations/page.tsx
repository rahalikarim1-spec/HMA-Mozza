import LocationsPage, { locationsMetadata } from "@/pages-impl/LocationsPage";

export const metadata = locationsMetadata("en");
export default function Page() {
  return <LocationsPage lang="en" />;
}
