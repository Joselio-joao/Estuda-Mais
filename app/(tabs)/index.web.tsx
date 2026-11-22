import { AccountRequired } from "@/components/account-required";

/** Web entry currently opens the authentication panel before the academic feed. */
export default function HomeScreenWeb() {
  return <AccountRequired />;
}
