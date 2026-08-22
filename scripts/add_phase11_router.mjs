import { readFile, writeFile } from "node:fs/promises";

const file = new URL("../server/routers.ts", import.meta.url);
let source = await readFile(file, "utf8");
const schemaAnchor = 'const ownerSearchSchema = z.object({ search: z.string().trim().max(120).optional() });';
const schemas = `${schemaAnchor} const safetyReportSchema = z.object({ targetType: z.enum(["post", "comment", "community", "group", "challenge", "user"]), targetId: z.number().int().positive(), category: z.enum(["spam", "bullying", "unsafe", "inappropriate", "other"]), details: z.string().trim().max(1000).nullable().optional() }); const reportDecisionSchema = z.object({ reportId: z.number().int().positive(), status: z.enum(["reviewing", "resolved", "dismissed"]), resolutionNote: z.string().trim().min(3).max(1000) }); const reportGrantSchema = z.object({ recipientName: z.string().trim().min(2).max(160), recipientEmail: z.string().trim().email().max(320), recipientType: z.enum(["guardian", "school"]) }); const reportGrantIdSchema = z.object({ grantId: z.number().int().positive() });`;
if (!source.includes("safetyReportSchema")) source = source.replace(schemaAnchor, schemas);
if (!source.includes("safety: router({")) {
  const anchor = ' }), weeklyChallenges: router(';
  const addition = ' }), safety: router({ report: protectedProcedure.input(safetyReportSchema).mutation(({ ctx, input }) => db.createSafetyReport(ctx.user.id, input)), mine: protectedProcedure.query(({ ctx }) => db.listOwnSafetyReports(ctx.user.id)) }), progress: router({ subjects: protectedProcedure.query(({ ctx }) => db.getSubjectProgress(ctx.user.id)), grants: protectedProcedure.query(({ ctx }) => db.listProgressReportGrants(ctx.user.id)), grant: protectedProcedure.input(reportGrantSchema).mutation(({ ctx, input }) => db.grantProgressReport(ctx.user.id, input)), revoke: protectedProcedure.input(reportGrantIdSchema).mutation(({ ctx, input }) => db.revokeProgressReportGrant(ctx.user.id, input.grantId)) }), weeklyChallenges: router(';
  source = source.replace(anchor, addition);
}
if (!source.includes("reports: adminProcedure")) {
  source = source.replace('audit: adminProcedure.query(() => owner.ownerAuditLog())', 'audit: adminProcedure.query(() => owner.ownerAuditLog()), reports: adminProcedure.input(z.object({ status: z.enum(["submitted", "reviewing", "resolved", "dismissed"]).optional() }).optional()).query(({ input }) => db.listOwnerSafetyReports(input?.status)), decideReport: adminProcedure.input(reportDecisionSchema).mutation(({ ctx, input }) => db.resolveSafetyReport(ctx.user.id, input.reportId, input.status, input.resolutionNote))');
}
await writeFile(file, source);
