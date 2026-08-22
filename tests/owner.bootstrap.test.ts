import { describe, expect, it } from "vitest";
import { appRouter } from "../server/routers";
import type { TrpcContext } from "../server/_core/context";

describe("configuração do proprietário", () => {
  it("expõe apenas o estado de prontidão da configuração, sem revelar o e-mail", async () => {
    const previousEmail = process.env.BOOTSTRAP_OWNER_EMAIL;
    process.env.BOOTSTRAP_OWNER_EMAIL = "owner@example.com";
    const ctx = {
      user: { id: 991, openId: "owner-test", name: "Owner", email: "owner@example.com", loginMethod: "test", role: "user", accountStatus: "active", restrictionReason: null, restrictedAt: null, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    } as TrpcContext;
    try {
      const result = await appRouter.createCaller(ctx).owner.bootstrapReady();
      expect(result).toEqual({ ready: true });
    } finally {
      if (previousEmail === undefined) delete process.env.BOOTSTRAP_OWNER_EMAIL;
      else process.env.BOOTSTRAP_OWNER_EMAIL = previousEmail;
    }
  });
});
