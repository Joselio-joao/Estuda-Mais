import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: false, shouldSetBadge: false, shouldShowBanner: true, shouldShowList: true }) });

export async function configureStudyReminder(hour: number, enabled: boolean) {
  if (Platform.OS === "web") return { granted: false, reason: "web" as const };
  if (Platform.OS === "android") await Notifications.setNotificationChannelAsync("study-reminders", { name: "Lembretes de estudo", importance: Notifications.AndroidImportance.DEFAULT, vibrationPattern: [0, 180], lightColor: "#0D47A1" });
  const current = await Notifications.getPermissionsAsync();
  const status = current.status === "granted" ? current.status : (await Notifications.requestPermissionsAsync()).status;
  if (status !== "granted") return { granted: false, reason: "permission" as const };
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(scheduled.filter((item) => item.content.data?.kind === "study-reminder").map((item) => Notifications.cancelScheduledNotificationAsync(item.identifier)));
  if (enabled) await Notifications.scheduleNotificationAsync({ content: { title: "Estuda+ · Hora de evoluir", body: "Reserve alguns minutos para o seu plano de estudo de hoje.", data: { kind: "study-reminder", url: "/ai" } }, trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute: 0, channelId: "study-reminders" } });
  return { granted: true, reason: "ok" as const };
}
