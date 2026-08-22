import { describe, expect, it } from "vitest";
import { z } from "zod";
const messageSchema = z.object({ action: z.enum(["explain", "solve", "summary", "quiz", "plan", "general"]), content: z.string().trim().min(2).max(2500) });
const planSchema = z.object({ subject: z.string().trim().min(2), goal: z.string().trim().min(5), minutesPerDay: z.number().int().min(15).max(240) });
describe("Professor IA validation", () => { it("accepts a guided exercise request", () => { expect(messageSchema.parse({ action: "solve", content: "Ajuda-me a resolver uma equação do primeiro grau." }).action).toBe("solve"); }); it("requires a realistic study-plan duration", () => { expect(() => planSchema.parse({ subject: "Física", goal: "Preparar o teste", minutesPerDay: 5 })).toThrow(); }); });
