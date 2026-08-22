import { readFile, writeFile } from "node:fs/promises";

const profileFile = new URL("../app/(tabs)/profile.tsx", import.meta.url);
let profile = await readFile(profileFile, "utf8");
const profileMarker = '</View><View style={styles.section}><Text style={styles.sectionTitle}>Distinções académicas</Text>';
const progressLink = '</View><View style={styles.section}><Text style={styles.sectionTitle}>O teu progresso</Text><Pressable onPress={() => router.push("/progress")} style={({ pressed }) => [styles.journey, pressed && styles.pressed]}><MaterialIcons name="insights" size={24} color="#0D47A1" /><View style={styles.journeyCopy}><Text style={styles.journeyTitle}>Progresso por disciplina</Text><Text style={styles.journeyText}>Consulta recursos concluídos, tempo de estudo e resultados de competições.</Text></View><MaterialIcons name="chevron-right" size={21} color="#B48C16" /></Pressable></View><View style={styles.section}><Text style={styles.sectionTitle}>Distinções académicas</Text>';
if (!profile.includes("Progresso por disciplina")) profile = profile.replace(profileMarker, progressLink);
await writeFile(profileFile, profile);

const ownerFile = new URL("../app/owner/index.tsx", import.meta.url);
let owner = await readFile(ownerFile, "utf8");
const ownerMarker = '<TabBar tab={tab} onSelect={setTab} />';
const reportsLink = '<TabBar tab={tab} onSelect={setTab} /><Pressable onPress={() => router.push("/owner/reports")} style={({ pressed }) => [styles.reportLink, pressed && styles.pressed]}><MaterialIcons name="flag" size={18} color="#B42318" /><Text style={styles.reportLinkText}>Rever denúncias enviadas por estudantes</Text><MaterialIcons name="chevron-right" size={19} color="#B42318" /></Pressable>';
if (!owner.includes("Rever denúncias enviadas")) owner = owner.replace(ownerMarker, reportsLink).replace('restricted: { flex: 1,', 'reportLink: { minHeight: 45, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 13, borderRadius: 13, backgroundColor: "#FFF0F0" }, reportLinkText: { flex: 1, color: "#B42318", fontSize: 12, fontWeight: "800" }, restricted: { flex: 1,');
await writeFile(ownerFile, owner);
