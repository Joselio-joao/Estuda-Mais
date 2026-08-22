import { describe, expect, it } from "vitest";
import { z } from "zod";
const responseSchema = z.object({ competitionId: z.number().int().positive(), response: z.string().trim().min(10).max(10000) });
const reviewSchema = z.object({ submissionId: z.number().int().positive(), score: z.number().int().min(0).max(100), feedback: z.string().trim().min(8).max(3000) });
describe("competition result validation", () => { it("accepts a substantive response", () => { expect(responseSchema.parse({ competitionId: 4, response: "Apresentei os cálculos e justifiquei cada passo da resolução." }).competitionId).toBe(4); }); it("rejects a score outside the 0-100 range", () => { expect(() => reviewSchema.parse({ submissionId: 2, score: 105, feedback: "Boa fundamentação e resolução consistente." })).toThrow(); }); });
