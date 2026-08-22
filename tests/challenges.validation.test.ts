import { describe, expect, it } from "vitest";
import { z } from "zod";

const deviceSettingsSchema = z.object({ deviceEnabled: z.boolean(), dailyReminderEnabled: z.boolean(), reminderHour: z.number().int().min(6).max(22) });
const weeklyChallengeSchema = z.object({ weekCode: z.string().trim().regex(/^\d{4}-W\d{2}$/), title: z.string().trim().min(4).max(180), description: z.string().trim().min(12).max(4000), subject: z.string().trim().min(2).max(80), startAt: z.string().datetime(), endAt: z.string().datetime(), coverColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/), badgeTitle: z.string().trim().min(3).max(100) });

describe("weekly challenges and device reminders", () => {
  const challenge = { weekCode: "2026-W34", title: "Revisão de funções", description: "Resolve três exercícios e explica o raciocínio em cada resposta.", subject: "Matemática", startAt: "2026-08-22T08:00:00.000Z", endAt: "2026-08-29T08:00:00.000Z", coverColor: "#0D47A1", badgeTitle: "Foco da Semana" };
  it("accepts a complete weekly challenge and a safe reminder hour", () => {
    expect(weeklyChallengeSchema.parse(challenge).weekCode).toBe("2026-W34");
    expect(deviceSettingsSchema.parse({ deviceEnabled: true, dailyReminderEnabled: true, reminderHour: 18 }).reminderHour).toBe(18);
  });
  it("rejects malformed week codes and unsafe reminder times", () => {
    expect(() => weeklyChallengeSchema.parse({ ...challenge, weekCode: "week-34" })).toThrow();
    expect(() => deviceSettingsSchema.parse({ deviceEnabled: true, dailyReminderEnabled: true, reminderHour: 3 })).toThrow();
  });
});
