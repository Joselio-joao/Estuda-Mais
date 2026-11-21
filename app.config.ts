import "./scripts/load-env.js";
import type { ExpoConfig } from "expo/config";

// Estuda+ design: a aplicação mantém uma identidade educativa, clara e mobile-first.
const rawBundleId = process.env.APP_BUNDLE_ID ?? "com.estudamais.app";
const bundleId = rawBundleId.replace(/[-_]/g, ".").replace(/[^a-zA-Z0-9.]/g, "").replace(/\.+/g, ".").replace(/^\.+|\.+$/g, "").toLowerCase() || "com.estudamais.app";
const env = {
  appName: process.env.APP_NAME ?? "Estuda+",
  appSlug: process.env.APP_SLUG ?? "estudamais",
  scheme: process.env.APP_SCHEME ?? "estudamais",
  iosBundleId: bundleId,
  androidPackage: bundleId,
};

const config: ExpoConfig = {
  name: env.appName, slug: env.appSlug, version: "1.0.0", orientation: "portrait", icon: "./assets/images/icon.png", scheme: env.scheme, userInterfaceStyle: "light", newArchEnabled: true,
  ios: { supportsTablet: true, bundleIdentifier: env.iosBundleId, infoPlist: { ITSAppUsesNonExemptEncryption: false, NSPhotoLibraryUsageDescription: "O Estuda+ usa a sua galeria apenas para escolher a foto de perfil e carregar recursos educativos." } },
  android: { adaptiveIcon: { backgroundColor: "#06265C", foregroundImage: "./assets/images/android-icon-foreground.png", backgroundImage: "./assets/images/android-icon-background.png", monochromeImage: "./assets/images/android-icon-monochrome.png" }, edgeToEdgeEnabled: true, predictiveBackGestureEnabled: false, package: env.androidPackage, permissions: ["POST_NOTIFICATIONS"] },
  web: { bundler: "metro", output: "single", favicon: "./assets/images/favicon.png" },
  plugins: ["expo-router", ["expo-image-picker", { photosPermission: "Permitir que o Estuda+ escolha uma foto de perfil e vídeos educativos." }], ["expo-video", { supportsBackgroundPlayback: true, supportsPictureInPicture: true }], ["expo-notifications", { icon: "./assets/images/android-icon-monochrome.png", color: "#0D47A1", defaultChannel: "study-reminders" }], ["expo-splash-screen", { image: "./assets/images/splash-icon.png", imageWidth: 200, resizeMode: "contain", backgroundColor: "#06265C" }]],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
    baseUrl: process.env.EXPO_PUBLIC_WEB_BASE_URL || undefined,
  },
};
export default config;
