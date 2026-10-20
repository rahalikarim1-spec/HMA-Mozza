import LocationsPage, { locationsMetadata } from "@/pages-impl/LocationsPage";

export const metadata = locationsMetadata("th");
export default function Page() {
  return <LocationsPage lang="th" />;
}
