import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const taskStatePath = resolve(process.cwd(), "TASK_STATE.md");
const source = readFileSync(taskStatePath, "utf8");
const taskPattern =
  /^- \[[ x]\] ([A-Z][A-Z0-9-]*-\d+) (DONE|OPEN|EXTERNAL_WAIT)\b/gm;
const entries = [...source.matchAll(taskPattern)].map((match) => ({
  id: match[1],
  status: match[2],
}));

if (entries.length === 0) {
  throw new Error("TASK_STATE.md contains no parseable task entries");
}

const openTasks = entries.filter((entry) => entry.status === "OPEN");
if (openTasks.length !== 1) {
  throw new Error(
    `TASK_STATE.md must contain exactly one OPEN task; found ${openTasks.length}`,
  );
}

const seen = new Map();
for (const entry of entries) {
  const previous = seen.get(entry.id);
  if (previous) {
    throw new Error(
      `TASK_STATE.md reuses task ID ${entry.id} (${previous} and ${entry.status}); task IDs must remain unique`,
    );
  }
  seen.set(entry.id, entry.status);
}

console.log(
  `TASK_STATE OK: ${entries.length} unique tasks, OPEN=${openTasks[0].id}`,
);
