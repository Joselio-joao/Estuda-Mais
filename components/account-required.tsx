import { StyleSheet, Text, View } from "react-native";
/** Estuda+ public entry: preserve the secure account flow in production and surface a useful local web preview in GitHub Pages. */
import { startOAuthLogin } from "@/constants/oauth";
import { AppButton } from "@/components/app-button";
import { BrandMark } from "@/components/brand-mark";
import { PublicWebExperience } from "@/components/public-web-experience";
import { ScreenContainer } from "@/components/screen-container";
const isPublicPreview = process.env.EXPO_PUBLIC_WEB_DEMO === "true";

export function AccountRequired() {
  if (isPublicPreview) return <PublicWebExperience />;

  return <ScreenContainer className="p-6" containerClassName="bg-background"><View style={styles.root}><View style={styles.hero}><BrandMark inverse /><View style={styles.copy}><Text style={styles.title}>A tua jornada académica começa aqui.</Text><Text style={styles.subtitle}>Aprende, conecta-te e evolui com outros estudantes angolanos.</Text></View><View style={styles.actions}><AppButton label="Criar conta" variant="gold" onPress={() => void startOAuthLogin()} /><AppButton label="Entrar" variant="secondary" onPress={() => void startOAuthLogin()} /></View><Text style={styles.footnote}>Acesso seguro para estudantes. Os teus dados académicos ajudam a personalizar a experiência.</Text></View></View></ScreenContainer>;
}

const styles = StyleSheet.create({ root: { flex: 1, justifyContent: "center" }, hero: { backgroundColor: "#06265C", borderRadius: 28, padding: 27, gap: 30, shadowColor: "#06265C", shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.16, shadowRadius: 20, elevation: 6 }, copy: { gap: 11 }, title: { color: "#FFFFFF", fontSize: 31, lineHeight: 38, fontWeight: "800", letterSpacing: -0.5 }, subtitle: { color: "#DCE8FB", fontSize: 16, lineHeight: 24 }, actions: { gap: 11 }, footnote: { color: "#B8CDF8", fontSize: 11, lineHeight: 17, textAlign: "center" } });
