import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["prettier", "--list-different", "."], {
  encoding: "utf8",
  shell: process.platform === "win32",
});

const files = result.stdout
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean);

if (files.length > 0) {
  console.error(`Prettier files: ${files.join(", ")}`);
  spawnSync("npx", ["prettier", "--write", ...files], {
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  const diff = spawnSync("git", ["diff", "--", ...files], {
    encoding: "utf8",
  });
  if (diff.stdout) process.stderr.write(diff.stdout);
}

for (const file of files) {
  console.error(`::error file=${file}::Prettier formatting required`);
}

if (result.stderr) process.stderr.write(result.stderr);
process.exit(files.length === 0 && result.status === 0 ? 0 : 1);
