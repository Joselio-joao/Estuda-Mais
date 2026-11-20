import { PublicWebExperience } from "@/components/public-web-experience";

/** Lightweight web entry: keep native/auth/backend screens out of the initial Pages bundle. */
export default function HomeScreenWeb() {
  return <PublicWebExperience />;
}
