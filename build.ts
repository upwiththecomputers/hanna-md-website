import { toSSG } from "hono/bun";
import app from "./src/index.tsx";

const result = await toSSG(app, { dir: "./dist" });

if (result.success) {
  console.log("SSG build complete.");
  console.log("Files generated:", result.files.length);
  for (const file of result.files) {
    console.log("  ", file);
  }
} else {
  console.error("SSG build failed:", result.error);
  process.exit(1);
}
