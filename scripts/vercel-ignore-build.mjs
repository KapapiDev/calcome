import { execFileSync } from "node:child_process";

function runGit(args) {
  return execFileSync("git", args, {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function resolveBase() {
  const previous = process.env.VERCEL_GIT_PREVIOUS_SHA?.trim();
  if (previous && !/^0+$/.test(previous)) return previous;

  try {
    return runGit(["rev-parse", "HEAD^"]);
  } catch {
    return null;
  }
}

function isNonRuntimeOnly(path) {
  return (
    path.endsWith(".md") ||
    path.startsWith("docs/") ||
    path.startsWith(".github/") ||
    /(^|\/)(?:__tests__\/.*|.*\.(?:test|spec)\.[^/]+|.*\.snap)$/.test(path)
  );
}

try {
  const base = resolveBase();
  if (!base) {
    console.log("No reliable previous commit; building conservatively.");
    process.exit(1);
  }

  const changed = runGit(["diff", "--name-only", base, "HEAD"])
    .split("\n")
    .map((path) => path.trim())
    .filter(Boolean);

  if (changed.length === 0) {
    console.log("No changed-file evidence; building conservatively.");
    process.exit(1);
  }

  const runtimeRelevant = changed.filter((path) => !isNonRuntimeOnly(path));
  if (runtimeRelevant.length > 0) {
    console.log(
      `Runtime-relevant or unknown changes detected: ${runtimeRelevant.join(", ")}`,
    );
    process.exit(1);
  }

  console.log(
    `Only non-runtime files changed (${changed.length}); skipping Vercel build.`,
  );
  process.exit(0);
} catch (error) {
  console.error(
    "Ignored-build detection failed; building conservatively.",
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
}
