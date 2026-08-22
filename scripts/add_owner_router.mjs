import { readFile, writeFile } from "node:fs/promises";

const file = new URL("../server/routers.ts", import.meta.url);
let source = await readFile(file, "utf8");
source = source.replace('import { protectedProcedure, publicProcedure, router } from "./_core/trpc";', 'import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";');
if (!source.includes('import * as owner from "./owner";')) {
  source = source.replace('import * as db from "./db";', 'import * as db from "./db";\nimport * as owner from "./owner";');
}
const schemaMarker = 'const weeklyChallengeIdSchema = z.object({ challengeId: z.number().int().positive() });';
const schemas = `${schemaMarker} const ownerAccountSchema = z.object({ userId: z.number().int().positive(), status: z.enum(["active", "suspended", "banned"]), reason: z.string().trim().min(3).max(500) }); const ownerPostSchema = z.object({ postId: z.number().int().positive(), status: z.enum(["visible", "hidden"]), reason: z.string().trim().min(3).max(500) }); const ownerSearchSchema = z.object({ search: z.string().trim().max(120).optional() });`;
if (!source.includes('ownerAccountSchema')) source = source.replace(schemaMarker, schemas);
if (!source.includes('bootstrapReady: protectedProcedure')) {
  source = source.replace('owner: router({ status: protectedProcedure', 'owner: router({ bootstrapReady: protectedProcedure.query(() => ({ ready: Boolean(process.env.BOOTSTRAP_OWNER_EMAIL) })), status: protectedProcedure');
}
if (!source.includes('owner: router({')) {
  const anchor = '\nexport type AppRouter';
  const anchorIndex = source.lastIndexOf(anchor);
  const closeIndex = source.lastIndexOf('}) });', anchorIndex);
  if (closeIndex < 0) throw new Error('Não foi possível localizar o fim do roteador.');
  const ownerRouter = `}), owner: router({ status: protectedProcedure.query(({ ctx }) => ({ isOwner: ctx.user.role === "admin" })), dashboard: adminProcedure.query(() => owner.ownerDashboard()), users: adminProcedure.input(ownerSearchSchema.optional()).query(({ input }) => owner.ownerUsers(input?.search ?? "")), setAccountStatus: adminProcedure.input(ownerAccountSchema).mutation(({ ctx, input }) => owner.setOwnerAccountStatus(ctx.user.id, input.userId, input.status, input.reason)), posts: adminProcedure.query(() => owner.ownerPosts()), setPostStatus: adminProcedure.input(ownerPostSchema).mutation(({ ctx, input }) => owner.setOwnerPostStatus(ctx.user.id, input.postId, input.status, input.reason)), audit: adminProcedure.query(() => owner.ownerAuditLog()) }) `;
  source = source.slice(0, closeIndex) + ownerRouter + source.slice(closeIndex + 2);
}
await writeFile(file, source);
