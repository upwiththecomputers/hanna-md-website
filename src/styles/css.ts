import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "..");

function readCSS(relativePath: string): string {
  return readFileSync(resolve(srcDir, relativePath), "utf-8");
}

export function getAllCSS(): string {
  const files = [
    "styles/global.css",
    "styles/layout.module.css",
    "components/header.module.css",
    "components/hero.module.css",
    "components/footer.module.css",
  ];

  return files.map(readCSS).join("\n");
}
