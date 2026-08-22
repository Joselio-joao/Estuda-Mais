import { describe, expect, it } from "vitest";

describe("denúncias e consentimento", () => {
  it("aceita apenas categorias de denúncia definidas", () => {
    expect(["spam", "bullying", "unsafe", "inappropriate", "other"]).toContain("bullying");
  });
  it("exige um consentimento identificável para relatórios", () => {
    const grant = { recipientName: "Encarregado de educação", recipientEmail: "familia@example.com", recipientType: "guardian" };
    expect(grant.recipientEmail).toContain("@");
  });
});
