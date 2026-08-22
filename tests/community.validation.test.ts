import { describe, expect, it } from "vitest";
import { z } from "zod";
const communitySchema = z.object({ name: z.string().trim().min(4), description: z.string().trim().min(12), category: z.string().min(2), visibility: z.enum(["public", "private"]) });
describe("community validation", () => { it("accepts a complete community", () => { expect(communitySchema.parse({ name: "Matemática 12.ª", description: "Grupo para estudar álgebra e preparar as avaliações.", category: "Matemática", visibility: "public" }).visibility).toBe("public"); }); it("rejects a short description", () => { expect(() => communitySchema.parse({ name: "Física", description: "Ajuda", category: "Física", visibility: "public" })).toThrow(); }); });
