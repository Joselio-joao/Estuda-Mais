import { mkdir, copyFile } from "node:fs/promises";
await mkdir("dist", { recursive: true });
await copyFile("web-demo/index.html", "dist/index.html");
console.log("Estuda Mais+ static web demo ready in dist");
