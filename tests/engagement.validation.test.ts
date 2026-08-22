import { describe, expect, it } from "vitest";
import { z } from "zod";

const attachmentSchema = z.object({ competitionId: z.number().int().positive(), base64: z.string().min(32).max(17_000_000), mimeType: z.string().min(3).max(120), fileName: z.string().min(1).max(180), fileSize: z.number().int().min(1).max(12_000_000) });
const notificationSchema = z.object({ type: z.enum(["competition", "submission", "evaluation", "certificate", "system"]), title: z.string().min(1).max(180), body: z.string().min(1) });

describe("engagement validation", () => {
  it("accepts a bounded competition attachment", () => {
    expect(attachmentSchema.parse({ competitionId: 2, base64: "d".repeat(64), mimeType: "application/pdf", fileName: "resolucao.pdf", fileSize: 430000 }).fileName).toBe("resolucao.pdf");
  });
  it("rejects an attachment that exceeds the permitted size", () => {
    expect(() => attachmentSchema.parse({ competitionId: 2, base64: "d".repeat(64), mimeType: "video/mp4", fileName: "video.mp4", fileSize: 12000001 })).toThrow();
  });
  it("accepts an evaluation notification", () => {
    expect(notificationSchema.parse({ type: "evaluation", title: "A tua resposta foi avaliada", body: "Recebeste feedback." }).type).toBe("evaluation");
  });
});
