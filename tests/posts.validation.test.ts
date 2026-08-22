import { describe, expect, it } from "vitest";
import { postSchema } from "../server/routers";
describe("post validation", () => { it("accepts a question publication", () => { expect(postSchema.parse({ type: "question", body: "Alguém pode explicar esta equação?" }).type).toBe("question"); }); it("rejects a blank publication", () => { expect(() => postSchema.parse({ type: "text", body: " " })).toThrow(); }); });
