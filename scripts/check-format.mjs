import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const result = spawnSync("npx", ["prettier", "--list-different", "."], {
  encoding: "utf8",
  shell: process.platform === "win32",
});

const files = result.stdout
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean);

for (const file of files) {
  console.error(`Prettier formatting required: ${file}`);
  const formatted = spawnSync("npx", ["prettier", file], {
    encoding: "utf8",
    shell: process.platform === "win32",
  }).stdout;
  const currentLines = readFileSync(file, "utf8").split(/\r?\n/);
  const formattedLines = formatted.split(/\r?\n/);
  const max = Math.max(currentLines.length, formattedLines.length);
  for (let index = 0; index < max; index += 1) {
    if (currentLines[index] !== formattedLines[index]) {
      console.error(`current ${index + 1}: ${currentLines[index] ?? "<missing>"}`);
      console.error(`format  ${index + 1}: ${formattedLines[index] ?? "<missing>"}`);
      break;
    }
  }
  console.error(`::error file=${file}::Prettier formatting required`);
}

if (result.stderr) process.stderr.write(result.stderr);
process.exit(files.length === 0 && result.status === 0 ? 0 : 1);
