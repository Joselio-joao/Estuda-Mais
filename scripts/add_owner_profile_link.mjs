import { readFile, writeFile } from "node:fs/promises";

const file = new URL("../app/(tabs)/profile.tsx", import.meta.url);
let source = await readFile(file, "utf8");
if (!source.includes("trpc.owner.status")) {
  source = source.replace(
    'const achievements = trpc.notifications.achievements.useQuery(undefined, { enabled: isAuthenticated });',
    'const achievements = trpc.notifications.achievements.useQuery(undefined, { enabled: isAuthenticated }); const owner = trpc.owner.status.useQuery(undefined, { enabled: isAuthenticated });',
  );
}
const marker = '</View><View style={styles.section}><Text style={styles.sectionTitle}>Interesses académicos</Text>';
const ownerLink = '</View>{owner.data?.isOwner ? <View style={styles.section}><Text style={styles.sectionTitle}>Gestão da aplicação</Text><Pressable onPress={() => router.push("/owner")} style={({ pressed }) => [styles.journey, pressed && styles.pressed]}><MaterialIcons name="admin-panel-settings" size={24} color="#0D47A1" /><View style={styles.journeyCopy}><Text style={styles.journeyTitle}>Área do proprietário</Text><Text style={styles.journeyText}>Modere conteúdo, suspenda contas, aplique banimentos e consulte o histórico.</Text></View><MaterialIcons name="chevron-right" size={21} color="#B48C16" /></Pressable></View> : null}<View style={styles.section}><Text style={styles.sectionTitle}>Interesses académicos</Text>';
if (!source.includes("Área do proprietário")) source = source.replace(marker, ownerLink);
await writeFile(file, source);
