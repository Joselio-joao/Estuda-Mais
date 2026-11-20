import { Stack } from "expo-router";

/** No native tab navigator on the public static demo; the demo owns its bottom navigation. */
export default function WebTabsLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
