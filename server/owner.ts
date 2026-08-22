import { and, desc, eq, like, or } from "drizzle-orm";
import { getDb } from "./db";
import { communities, ownerAuditLogs, posts, profiles, users, weeklyChallenges } from "../drizzle/schema";

type AccountStatus = "active" | "suspended" | "banned";
type PostStatus = "visible" | "hidden";

async function audit(actorUserId: number, targetType: "user" | "post", targetId: number, action: string, reason?: string | null, targetUserId?: number | null) {
  const db = await getDb();
  if (!db) throw new Error("Base de dados indisponível.");
  await db.insert(ownerAuditLogs).values({ actorUserId, targetType, targetId, targetUserId: targetUserId ?? null, action, reason: reason ?? null });
}

export async function ownerDashboard() {
  const db = await getDb();
  if (!db) throw new Error("Base de dados indisponível.");
  const [allUsers, allPosts, allCommunities, allChallenges] = await Promise.all([db.select().from(users), db.select().from(posts), db.select().from(communities), db.select().from(weeklyChallenges)]);
  return { users: allUsers.length, activeUsers: allUsers.filter((user) => user.accountStatus === "active").length, restrictedUsers: allUsers.filter((user) => user.accountStatus !== "active").length, visiblePosts: allPosts.filter((post) => post.moderationStatus === "visible").length, hiddenPosts: allPosts.filter((post) => post.moderationStatus === "hidden").length, communities: allCommunities.length, weeklyChallenges: allChallenges.length };
}

export async function ownerUsers(search = "") {
  const db = await getDb();
  if (!db) throw new Error("Base de dados indisponível.");
  const condition = search ? or(like(users.email, `%${search}%`), like(users.name, `%${search}%`), like(profiles.fullName, `%${search}%`)) : undefined;
  return db.select({ id: users.id, name: users.name, email: users.email, role: users.role, accountStatus: users.accountStatus, restrictionReason: users.restrictionReason, restrictedAt: users.restrictedAt, createdAt: users.createdAt, fullName: profiles.fullName, province: profiles.province }).from(users).leftJoin(profiles, eq(users.id, profiles.userId)).where(condition).orderBy(desc(users.createdAt)).limit(80);
}

export async function setOwnerAccountStatus(actorUserId: number, targetUserId: number, status: AccountStatus, reason: string) {
  const db = await getDb();
  if (!db) throw new Error("Base de dados indisponível.");
  if (actorUserId === targetUserId) throw new Error("Por segurança, não pode alterar o estado da sua própria conta.");
  const [target] = await db.select().from(users).where(eq(users.id, targetUserId)).limit(1);
  if (!target) throw new Error("Conta não encontrada.");
  await db.update(users).set({ accountStatus: status, restrictionReason: status === "active" ? null : reason, restrictedAt: status === "active" ? null : new Date() }).where(eq(users.id, targetUserId));
  await audit(actorUserId, "user", targetUserId, `account_${status}`, reason, targetUserId);
  return { success: true };
}

export async function ownerPosts() {
  const db = await getDb();
  if (!db) throw new Error("Base de dados indisponível.");
  return db.select({ id: posts.id, body: posts.body, type: posts.type, moderationStatus: posts.moderationStatus, moderationReason: posts.moderationReason, moderatedAt: posts.moderatedAt, createdAt: posts.createdAt, userId: posts.userId, fullName: profiles.fullName }).from(posts).leftJoin(profiles, eq(posts.userId, profiles.userId)).orderBy(desc(posts.createdAt)).limit(80);
}

export async function setOwnerPostStatus(actorUserId: number, postId: number, status: PostStatus, reason: string) {
  const db = await getDb();
  if (!db) throw new Error("Base de dados indisponível.");
  const [post] = await db.select().from(posts).where(eq(posts.id, postId)).limit(1);
  if (!post) throw new Error("Publicação não encontrada.");
  await db.update(posts).set({ moderationStatus: status, moderationReason: status === "visible" ? null : reason, moderatedAt: status === "visible" ? null : new Date() }).where(eq(posts.id, postId));
  await audit(actorUserId, "post", postId, `post_${status}`, reason, post.userId);
  return { success: true };
}

export async function ownerAuditLog() {
  const db = await getDb();
  if (!db) throw new Error("Base de dados indisponível.");
  return db.select().from(ownerAuditLogs).orderBy(desc(ownerAuditLogs.createdAt)).limit(80);
}
