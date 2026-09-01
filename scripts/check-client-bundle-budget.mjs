import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { gzipSync } from "node:zlib";

const nextDir = resolve(process.cwd(), ".next");
const manifestPath = resolve(nextDir, "build-manifest.json");
const chunksDir = resolve(nextDir, "static", "chunks");

if (!existsSync(manifestPath)) {
  throw new Error(
    "PERF-007 requires .next/build-manifest.json; run `npm run build` before this check",
  );
}

if (!existsSync(chunksDir)) {
  throw new Error(
    "PERF-007 requires .next/static/chunks; run `npm run build` before this check",
  );
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const sharedEntries = [
  ...(Array.isArray(manifest.polyfillFiles) ? manifest.polyfillFiles : []),
  ...(Array.isArray(manifest.rootMainFiles) ? manifest.rootMainFiles : []),
].filter((file) => file.endsWith(".js"));
const sharedFiles = [...new Set(sharedEntries)];

if (sharedFiles.length === 0) {
  throw new Error(
    "PERF-007 could not resolve shared client JavaScript from build-manifest.json",
  );
}

function measure(filePath) {
  const contents = readFileSync(filePath);
  return {
    raw: contents.byteLength,
    gzip: gzipSync(contents, { level: 9 }).byteLength,
  };
}

const sharedMeasurements = sharedFiles.map((file) => {
  const filePath = resolve(nextDir, file);
  if (!existsSync(filePath)) {
    throw new Error(
      `PERF-007 manifest entry is missing from build output: ${file}`,
    );
  }
  return { file, ...measure(filePath) };
});

function walkJavaScript(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) return walkJavaScript(path);
    if (!entry.isFile() || !entry.name.endsWith(".js")) return [];
    return [path];
  });
}

const allChunkMeasurements = walkJavaScript(chunksDir).map((filePath) => ({
  file: relative(nextDir, filePath).replaceAll("\\", "/"),
  ...measure(filePath),
}));

const sharedRaw = sharedMeasurements.reduce((sum, item) => sum + item.raw, 0);
const sharedGzip = sharedMeasurements.reduce((sum, item) => sum + item.gzip, 0);
const totalRaw = allChunkMeasurements.reduce((sum, item) => sum + item.raw, 0);
const totalGzip = allChunkMeasurements.reduce(
  (sum, item) => sum + item.gzip,
  0,
);
const largestSharedGzip = Math.max(
  ...sharedMeasurements.map((item) => item.gzip),
);

const kib = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;
const SHARED_GZIP_BUDGET = 450 * 1024;
const SINGLE_SHARED_CHUNK_GZIP_BUDGET = 300 * 1024;

console.log("PERF-007 shared client bundle audit");
console.log(`- shared JS files: ${sharedMeasurements.length}`);
console.log(`- shared JS raw: ${kib(sharedRaw)}`);
console.log(
  `- shared JS gzip: ${kib(sharedGzip)} / ${kib(SHARED_GZIP_BUDGET)} budget`,
);
console.log(
  `- largest shared chunk gzip: ${kib(largestSharedGzip)} / ${kib(SINGLE_SHARED_CHUNK_GZIP_BUDGET)} budget`,
);
console.log(`- all emitted client chunks: ${allChunkMeasurements.length}`);
console.log(`- all emitted client JS raw: ${kib(totalRaw)}`);
console.log(`- all emitted client JS gzip: ${kib(totalGzip)}`);
console.log("- largest emitted chunks (gzip):");
for (const item of [...allChunkMeasurements]
  .sort((a, b) => b.gzip - a.gzip)
  .slice(0, 10)) {
  console.log(`  ${kib(item.gzip)}  ${item.file}`);
}

const failures = [];
if (sharedGzip > SHARED_GZIP_BUDGET) {
  failures.push(
    `shared client JavaScript gzip ${kib(sharedGzip)} exceeds ${kib(SHARED_GZIP_BUDGET)}`,
  );
}
if (largestSharedGzip > SINGLE_SHARED_CHUNK_GZIP_BUDGET) {
  failures.push(
    `largest shared chunk gzip ${kib(largestSharedGzip)} exceeds ${kib(SINGLE_SHARED_CHUNK_GZIP_BUDGET)}`,
  );
}

if (failures.length > 0) {
  throw new Error(`PERF-007 bundle budget failed:\n- ${failures.join("\n- ")}`);
}
