import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AppButton } from "@/components/app-button";
import { ScreenContainer } from "@/components/screen-container";
import { trpc } from "@/lib/trpc";

type PanelTab = "overview" | "people" | "content" | "history";

export default function OwnerScreen() {
  const router = useRouter();
  const status = trpc.owner.status.useQuery();
  const isOwner = Boolean(status.data?.isOwner);
  const dashboard = trpc.owner.dashboard.useQuery(undefined, { enabled: isOwner });
  const people = trpc.owner.users.useQuery({}, { enabled: isOwner });
  const posts = trpc.owner.posts.useQuery(undefined, { enabled: isOwner });
  const audit = trpc.owner.audit.useQuery(undefined, { enabled: isOwner });
  const accountMutation = trpc.owner.setAccountStatus.useMutation({
    onSuccess: () => {
      void people.refetch();
      void dashboard.refetch();
      void audit.refetch();
    },
  });
  const postMutation = trpc.owner.setPostStatus.useMutation({
    onSuccess: () => {
      void posts.refetch();
      void dashboard.refetch();
      void audit.refetch();
    },
  });
  const [tab, setTab] = useState<PanelTab>("overview");
  const [reason, setReason] = useState("Acção aplicada pelo proprietário");
  const safeReason = useMemo(() => reason.trim().length >= 3 ? reason.trim() : "Acção aplicada pelo proprietário", [reason]);

  const refreshOwnerData = () => {
    void people.refetch();
    void posts.refetch();
    void dashboard.refetch();
    void audit.refetch();
  };

  const decideAccount = (userId: number, label: string, next: "active" | "suspended" | "banned") => {
    const verb = next === "active" ? "Reactivar" : next === "suspended" ? "Suspender" : "Banir";
    Alert.alert(`${verb} conta`, `Confirmar a acção para ${label}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Confirmar", style: next === "banned" ? "destructive" : "default", onPress: () => accountMutation.mutate({ userId, status: next, reason: safeReason }) },
    ]);
  };

  const decidePost = (postId: number, next: "visible" | "hidden") => {
    const label = next === "hidden" ? "Ocultar publicação" : "Restaurar publicação";
    Alert.alert(label, "Confirmar esta acção de moderação?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Confirmar", onPress: () => postMutation.mutate({ postId, status: next, reason: safeReason }) },
    ]);
  };

  if (status.isLoading) {
    return <ScreenContainer className="items-center justify-center"><ActivityIndicator size="large" color="#0D47A1" /></ScreenContainer>;
  }

  if (!isOwner) {
    return <ScreenContainer className="p-6" containerClassName="bg-background"><View style={styles.restricted}><View style={styles.restrictedIcon}><MaterialIcons name="admin-panel-settings" size={31} color="#0D47A1" /></View><Text style={styles.restrictedTitle}>Área reservada ao proprietário</Text><Text style={styles.restrictedText}>A sua conta precisa ser configurada como proprietária antes de poder gerir utilizadores, conteúdo e medidas de segurança.</Text><AppButton label="Voltar ao perfil" variant="secondary" onPress={() => router.back()} /></View></ScreenContainer>;
  }

  return <ScreenContainer className="flex-1" containerClassName="bg-background"><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><View style={styles.header}><Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={() => router.back()} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><MaterialIcons name="arrow-back" size={22} color="#0D47A1" /></Pressable><View style={styles.headerCopy}><Text style={styles.eyebrow}>CONTROLO DO CRIADOR</Text><Text style={styles.title}>Área do proprietário</Text></View></View><Text style={styles.subtitle}>Gira a comunidade a partir do telemóvel. Todas as decisões ficam registadas no histórico de auditoria.</Text><View style={styles.reason}><MaterialIcons name="edit-note" size={20} color="#0D47A1" /><TextInput value={reason} onChangeText={setReason} placeholder="Motivo da acção administrativa" placeholderTextColor="#94A3B8" style={styles.reasonInput} maxLength={500} /></View><TabBar tab={tab} onSelect={setTab} /><Pressable onPress={() => router.push("/owner/reports")} style={({ pressed }) => [styles.reportLink, pressed && styles.pressed]}><MaterialIcons name="flag" size={18} color="#B42318" /><Text style={styles.reportLinkText}>Rever denúncias enviadas por estudantes</Text><MaterialIcons name="chevron-right" size={19} color="#B42318" /></Pressable>{accountMutation.isPending || postMutation.isPending ? <View style={styles.loading}><ActivityIndicator color="#0D47A1" /><Text style={styles.loadingText}>A aplicar a decisão…</Text></View> : null}{tab === "overview" ? <Overview dashboard={dashboard.data} /> : null}{tab === "people" ? <PeopleList items={people.data ?? []} onAccount={decideAccount} /> : null}{tab === "content" ? <ContentList items={posts.data ?? []} onPost={decidePost} /> : null}{tab === "history" ? <HistoryList items={audit.data ?? []} /> : null}<Pressable accessibilityRole="button" onPress={refreshOwnerData} style={({ pressed }) => [styles.refresh, pressed && styles.pressed]}><MaterialIcons name="refresh" size={18} color="#0D47A1" /><Text style={styles.refreshText}>Actualizar dados</Text></Pressable></ScrollView></ScreenContainer>;
}

function TabBar({ tab, onSelect }: { tab: PanelTab; onSelect: (tab: PanelTab) => void }) {
  const tabs: { id: PanelTab; label: string }[] = [{ id: "overview", label: "Resumo" }, { id: "people", label: "Pessoas" }, { id: "content", label: "Conteúdo" }, { id: "history", label: "Histórico" }];
  return <View style={styles.tabs}>{tabs.map((item) => <Pressable key={item.id} onPress={() => onSelect(item.id)} style={({ pressed }) => [styles.tab, tab === item.id && styles.tabActive, pressed && styles.pressed]}><Text style={[styles.tabText, tab === item.id && styles.tabTextActive]}>{item.label}</Text></Pressable>)}</View>;
}

function Overview({ dashboard }: { dashboard: { users: number; activeUsers: number; restrictedUsers: number; visiblePosts: number; hiddenPosts: number; communities: number; weeklyChallenges: number } | undefined }) {
  const metrics = [{ icon: "people" as const, value: dashboard?.users, label: "Contas" }, { icon: "verified-user" as const, value: dashboard?.activeUsers, label: "Activas" }, { icon: "block" as const, value: dashboard?.restrictedUsers, label: "Restritas" }, { icon: "article" as const, value: dashboard?.visiblePosts, label: "Publicações" }, { icon: "groups" as const, value: dashboard?.communities, label: "Comunidades" }, { icon: "emoji-events" as const, value: dashboard?.weeklyChallenges, label: "Desafios" }];
  return <View style={styles.grid}>{metrics.map((metric) => <View key={metric.label} style={styles.metric}><View style={styles.metricIcon}><MaterialIcons name={metric.icon} size={20} color="#0D47A1" /></View><Text style={styles.metricValue}>{dashboard ? metric.value : "—"}</Text><Text style={styles.metricLabel}>{metric.label}</Text></View>)}<View style={styles.notice}><MaterialIcons name="shield" size={22} color="#1C9C67" /><Text style={styles.noticeText}>Use os separadores Pessoas e Conteúdo para aplicar medidas de segurança. As decisões ficam registadas e podem ser revertidas quando apropriado.</Text></View></View>;
}

function PeopleList({ items, onAccount }: { items: { id: number; name: string | null; fullName: string | null; email: string | null; accountStatus: "active" | "suspended" | "banned" }[]; onAccount: (id: number, label: string, status: "active" | "suspended" | "banned") => void }) {
  if (!items.length) return <Empty icon="people-outline" text="Ainda não existem contas disponíveis para gerir." />;
  return <View style={styles.list}>{items.map((person) => { const label = person.fullName || person.name || "Conta sem perfil"; return <View key={person.id} style={styles.card}><View style={styles.cardHead}><View style={styles.personAvatar}><Text style={styles.personInitial}>{label[0]}</Text></View><View style={styles.cardCopy}><Text style={styles.cardTitle}>{label}</Text><Text style={styles.cardText}>{person.email || "Sem e-mail"}</Text><StatusLabel status={person.accountStatus} /></View></View><View style={styles.actions}>{person.accountStatus === "active" ? <><SmallAction label="Suspender" icon="pause-circle-outline" onPress={() => onAccount(person.id, label, "suspended")} /><SmallAction label="Banir" icon="block" destructive onPress={() => onAccount(person.id, label, "banned")} /></> : <SmallAction label="Reactivar" icon="check-circle" onPress={() => onAccount(person.id, label, "active")} />}</View></View>; })}</View>;
}

function ContentList({ items, onPost }: { items: { id: number; fullName: string | null; body: string; type: "text" | "photo" | "video" | "question" | "document"; moderationStatus: "visible" | "hidden" }[]; onPost: (id: number, status: "visible" | "hidden") => void }) {
  if (!items.length) return <Empty icon="article" text="Ainda não existem publicações para moderar." />;
  return <View style={styles.list}>{items.map((post) => <View key={post.id} style={styles.card}><View style={styles.cardHead}><View style={styles.personAvatar}><MaterialIcons name={post.type === "question" ? "help-outline" : "article"} size={20} color="#0D47A1" /></View><View style={styles.cardCopy}><Text style={styles.cardTitle}>{post.fullName || "Estudante"}</Text><Text style={styles.cardText} numberOfLines={3}>{post.body}</Text><StatusLabel status={post.moderationStatus} /></View></View><View style={styles.actions}><SmallAction label={post.moderationStatus === "visible" ? "Ocultar" : "Restaurar"} icon={post.moderationStatus === "visible" ? "visibility-off" : "visibility"} destructive={post.moderationStatus === "visible"} onPress={() => onPost(post.id, post.moderationStatus === "visible" ? "hidden" : "visible")} /></View></View>)}</View>;
}

function HistoryList({ items }: { items: { id: number; action: string; reason: string | null; createdAt: Date }[] }) {
  if (!items.length) return <Empty icon="history" text="As decisões administrativas aparecerão aqui." />;
  return <View style={styles.list}>{items.map((entry) => <View key={entry.id} style={styles.audit}><View style={styles.auditIcon}><MaterialIcons name="history" size={18} color="#0D47A1" /></View><View style={styles.auditCopy}><Text style={styles.auditTitle}>{entry.action.replace(/_/g, " ")}</Text><Text style={styles.auditText}>{entry.reason || "Sem motivo adicional"}</Text><Text style={styles.auditDate}>{new Date(entry.createdAt).toLocaleString("pt-PT")}</Text></View></View>)}</View>;
}

function StatusLabel({ status }: { status: "active" | "suspended" | "banned" | "visible" | "hidden" }) { const restricted = status === "suspended" || status === "banned" || status === "hidden"; const text = status === "active" ? "Activa" : status === "suspended" ? "Suspensa" : status === "banned" ? "Banida" : status === "visible" ? "Visível" : "Oculta"; return <View style={[styles.status, restricted && styles.statusRestricted]}><Text style={[styles.statusText, restricted && styles.statusRestrictedText]}>{text}</Text></View>; }
function SmallAction({ label, icon, destructive = false, onPress }: { label: string; icon: keyof typeof MaterialIcons.glyphMap; destructive?: boolean; onPress: () => void }) { return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.smallAction, destructive && styles.smallActionDanger, pressed && styles.pressed]}><MaterialIcons name={icon} size={17} color={destructive ? "#B42318" : "#0D47A1"} /><Text style={[styles.smallActionText, destructive && styles.smallActionTextDanger]}>{label}</Text></Pressable>; }
function Empty({ icon, text }: { icon: keyof typeof MaterialIcons.glyphMap; text: string }) { return <View style={styles.empty}><MaterialIcons name={icon} size={28} color="#0D47A1" /><Text style={styles.emptyText}>{text}</Text></View>; }

const styles = StyleSheet.create({ content: { padding: 20, paddingBottom: 34, gap: 16 }, header: { flexDirection: "row", alignItems: "center", gap: 12 }, back: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E1F0" }, headerCopy: { gap: 2 }, eyebrow: { color: "#0D47A1", fontSize: 10, fontWeight: "800", letterSpacing: 0.8 }, title: { color: "#1E293B", fontSize: 22, fontWeight: "800" }, subtitle: { color: "#64748B", fontSize: 13, lineHeight: 19 }, reason: { minHeight: 51, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 13, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E1F0", borderRadius: 14 }, reasonInput: { flex: 1, color: "#1E293B", fontSize: 13, paddingVertical: 10 }, tabs: { flexDirection: "row", gap: 7 }, tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10, backgroundColor: "#EAF1FF" }, tabActive: { backgroundColor: "#0D47A1" }, tabText: { color: "#0D47A1", fontSize: 11, fontWeight: "800" }, tabTextActive: { color: "#FFFFFF" }, loading: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, padding: 12, borderRadius: 12, backgroundColor: "#EAF1FF" }, loadingText: { color: "#0D47A1", fontSize: 12, fontWeight: "700" }, grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, metric: { width: "31%", minHeight: 104, padding: 12, borderRadius: 16, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E1F0", gap: 5 }, metricIcon: { width: 31, height: 31, borderRadius: 10, backgroundColor: "#EAF1FF", alignItems: "center", justifyContent: "center" }, metricValue: { color: "#1E293B", fontSize: 20, fontWeight: "800" }, metricLabel: { color: "#64748B", fontSize: 10, fontWeight: "700" }, notice: { width: "100%", flexDirection: "row", gap: 10, padding: 14, borderRadius: 15, backgroundColor: "#EDFBF4" }, noticeText: { flex: 1, color: "#24724E", fontSize: 12, lineHeight: 18 }, list: { gap: 10 }, card: { padding: 13, gap: 12, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E1F0", borderRadius: 16 }, cardHead: { flexDirection: "row", gap: 10 }, personAvatar: { width: 39, height: 39, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: "#EAF1FF" }, personInitial: { color: "#0D47A1", fontSize: 16, fontWeight: "800" }, cardCopy: { flex: 1, gap: 2 }, cardTitle: { color: "#1E293B", fontSize: 14, fontWeight: "800" }, cardText: { color: "#64748B", fontSize: 11, lineHeight: 17 }, status: { alignSelf: "flex-start", marginTop: 4, borderRadius: 7, paddingHorizontal: 8, paddingVertical: 4, backgroundColor: "#EDFBF4" }, statusRestricted: { backgroundColor: "#FFF0F0" }, statusText: { color: "#24724E", fontSize: 10, fontWeight: "800" }, statusRestrictedText: { color: "#B42318" }, actions: { flexDirection: "row", flexWrap: "wrap", gap: 8 }, smallAction: { minHeight: 36, flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center", paddingHorizontal: 11, borderRadius: 10, backgroundColor: "#EAF1FF" }, smallActionDanger: { backgroundColor: "#FFF0F0" }, smallActionText: { color: "#0D47A1", fontSize: 11, fontWeight: "800" }, smallActionTextDanger: { color: "#B42318" }, audit: { flexDirection: "row", gap: 10, padding: 13, borderRadius: 14, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E1F0" }, auditIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: "#EAF1FF", alignItems: "center", justifyContent: "center" }, auditCopy: { flex: 1, gap: 2 }, auditTitle: { color: "#1E293B", fontSize: 13, fontWeight: "800", textTransform: "capitalize" }, auditText: { color: "#64748B", fontSize: 11, lineHeight: 16 }, auditDate: { color: "#94A3B8", fontSize: 10, marginTop: 2 }, empty: { alignItems: "center", gap: 9, padding: 28, borderRadius: 16, backgroundColor: "#F2F7FF" }, emptyText: { color: "#486487", fontSize: 12, textAlign: "center", lineHeight: 18 }, refresh: { minHeight: 46, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 13, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E1F0" }, refreshText: { color: "#0D47A1", fontSize: 13, fontWeight: "800" }, reportLink: { minHeight: 45, flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 13, borderRadius: 13, backgroundColor: "#FFF0F0" }, reportLinkText: { flex: 1, color: "#B42318", fontSize: 12, fontWeight: "800" }, restricted: { flex: 1, justifyContent: "center", gap: 15 }, restrictedIcon: { width: 64, height: 64, borderRadius: 20, backgroundColor: "#EAF1FF", alignItems: "center", justifyContent: "center" }, restrictedTitle: { color: "#1E293B", fontSize: 25, lineHeight: 31, fontWeight: "800" }, restrictedText: { color: "#64748B", fontSize: 15, lineHeight: 22 }, pressed: { opacity: 0.68 } });
