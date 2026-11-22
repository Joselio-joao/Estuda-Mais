import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable, ScrollView } from "react-native";
import { startOAuthLogin } from "@/constants/oauth";

/** Login/signup panel based on the supplied visual reference. */
export function AccountRequired() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+244");
  const isSignup = mode === "signup";

  return (
    <View className="auth-screen" style={styles.screen}>
      <View className="auth-purple-shape" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View className="auth-panel" style={styles.panel}>
          {isSignup ? (
            <Pressable accessibilityRole="button" onPress={() => setMode("login")} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={22} color="#222" />
            </Pressable>
          ) : <View style={styles.topSpacer} />}
          <View style={styles.headingGroup}>
            <Text className="auth-heading" style={styles.heading}>{isSignup ? "Create account" : "Login"}</Text>
            <Text style={styles.subline}>{isSignup ? "Already have an account? " : "Don't have an account? "}<Text className="auth-link" onPress={() => setMode(isSignup ? "login" : "signup")}>{isSignup ? "sign in" : "sign up"}</Text></Text>
          </View>

          {isSignup ? (
            <View style={styles.fields}>
              <TextInput value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#909090" style={styles.field} autoCapitalize="words" />
              <TextInput value={contact} onChangeText={setContact} placeholder="Email or phone" placeholderTextColor="#909090" style={styles.field} keyboardType="email-address" autoCapitalize="none" />
              <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#909090" style={styles.field} secureTextEntry />
            </View>
          ) : (
            <View style={styles.fields}>
              <View style={styles.phoneField}>
                <TextInput value={countryCode} onChangeText={setCountryCode} style={styles.countryCode} keyboardType="phone-pad" />
                <View style={styles.inputDivider} />
                <TextInput value={contact} onChangeText={setContact} placeholder="Phone number" placeholderTextColor="#909090" style={styles.phoneInput} keyboardType="phone-pad" />
              </View>
              <View style={styles.passwordField}>
                <MaterialIcons name="lock-outline" size={16} color="#929292" />
                <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#909090" style={styles.passwordInput} secureTextEntry />
                <Pressable onPress={() => setPassword("")}><Text className="auth-forgot" style={styles.forgot}>FORGOT</Text></Pressable>
              </View>
            </View>
          )}

          <View style={styles.buttonRow}>
            <Pressable accessibilityRole="button" onPress={() => void startOAuthLogin()} className="auth-primary" style={styles.primaryButton}>
              <Text style={styles.primaryText}>{isSignup ? "Sign up" : "Login"}</Text>
              <MaterialIcons name="login" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          {!isSignup ? (
            <View style={styles.socialRow}>
              <Pressable accessibilityRole="button" onPress={() => void startOAuthLogin()} style={[styles.social, styles.apple]}><MaterialIcons name="apple" size={19} color="#FFFFFF" /></Pressable>
              <Pressable accessibilityRole="button" onPress={() => void startOAuthLogin()} style={[styles.social, styles.facebook]}><Text style={styles.socialLetter}>f</Text></Pressable>
              <Pressable accessibilityRole="button" onPress={() => void startOAuthLogin()} style={styles.google}><Text style={styles.googleLetter}>G</Text></Pressable>
              <Pressable accessibilityRole="button" onPress={() => void startOAuthLogin()} style={[styles.social, styles.twitter]}><MaterialIcons name="alternate-email" size={17} color="#FFFFFF" /></Pressable>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF", minHeight: "100%" },
  scroll: { flexGrow: 1, justifyContent: "center" },
  panel: { width: "100%", minHeight: 680, maxWidth: 460, alignSelf: "center", paddingHorizontal: 30, paddingTop: 34, paddingBottom: 38, justifyContent: "center" },
  topSpacer: { height: 92 },
  backButton: { height: 42, justifyContent: "center", alignSelf: "flex-start", marginBottom: 105 },
  headingGroup: { marginBottom: 30 },
  heading: { fontSize: 28, lineHeight: 34, fontWeight: "800", color: "#171717", letterSpacing: -0.4 },
  subline: { fontSize: 11, color: "#777777", marginTop: 7 },
  fields: { gap: 17 },
  field: { height: 41, borderWidth: 1, borderColor: "#BDBDBD", borderRadius: 22, paddingHorizontal: 15, fontSize: 11, color: "#222", backgroundColor: "#fff" },
  phoneField: { height: 41, borderWidth: 1, borderColor: "#BDBDBD", borderRadius: 22, paddingHorizontal: 13, flexDirection: "row", alignItems: "center" },
  countryCode: { width: 33, fontSize: 12, color: "#333", padding: 0 },
  inputDivider: { height: 22, width: 1, backgroundColor: "#BDBDBD", marginRight: 10 },
  phoneInput: { flex: 1, fontSize: 11, color: "#222", padding: 0 },
  passwordField: { height: 41, borderWidth: 1, borderColor: "#BDBDBD", borderRadius: 22, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", gap: 7 },
  passwordInput: { flex: 1, fontSize: 11, color: "#222", padding: 0 },
  forgot: { fontSize: 8, fontWeight: "800", color: "#8153AA", letterSpacing: 0.1 },
  buttonRow: { marginTop: 66, alignItems: "flex-end" },
  primaryButton: { height: 41, minWidth: 97, paddingHorizontal: 17, borderRadius: 24, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  primaryText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  socialRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 80 },
  social: { width: 25, height: 25, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  apple: { backgroundColor: "#080808" },
  facebook: { backgroundColor: "#2583D9" },
  twitter: { backgroundColor: "#2E92D7" },
  socialLetter: { color: "#fff", fontWeight: "900", fontSize: 19, lineHeight: 22 },
  google: { width: 25, height: 25, alignItems: "center", justifyContent: "center" },
  googleLetter: { color: "#4285F4", fontSize: 18, fontWeight: "900" },
});
