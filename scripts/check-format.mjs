import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["prettier", "--list-different", "."], {
  encoding: "utf8",
  shell: process.platform === "win32",
});

const files = result.stdout
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean);

for (const file of files) {
  console.error(`::error file=${file}::Prettier formatting required`);
}

if (result.stderr) process.stderr.write(result.stderr);
process.exit(files.length === 0 && result.status === 0 ? 0 : 1);
