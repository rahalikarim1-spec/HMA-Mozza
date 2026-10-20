import LocationsPage, { locationsMetadata } from "@/pages-impl/LocationsPage";

export const metadata = locationsMetadata("ar");
export default function Page() {
  return <LocationsPage lang="ar" />;
}
