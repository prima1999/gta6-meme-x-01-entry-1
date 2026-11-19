// Passes the recorded X post along to the bounty checker.
// The program takes POST.json from the bot folder and leaves a byte-for-byte
// copy of it in the output folder. It touches nothing else on disk.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const sourceDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourceFile = join(sourceDir, "POST.json");
const targetFile = join(targetDir, "POST.json");

if (!existsSync(sourceFile)) {
  throw new Error("Cannot find POST.json in the bot folder: " + sourceFile);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(sourceFile, targetFile);
console.log("Wrote " + targetFile + " from " + sourceFile);
