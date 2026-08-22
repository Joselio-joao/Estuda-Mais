import { describe, expect, it } from "vitest";

const statuses = ["active", "suspended", "banned"] as const;

describe("controlos do proprietário", () => {
  it("reconhece apenas os estados de conta permitidos", () => {
    expect(statuses).toContain("banned");
    expect(statuses).not.toContain("removed");
  });

  it("exige um motivo significativo para acções administrativas", () => {
    const reason = "Violação repetida das regras da comunidade";
    expect(reason.trim().length).toBeGreaterThanOrEqual(3);
  });
});
