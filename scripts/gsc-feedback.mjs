import fs from "node:fs";
import path from "node:path";

const HEADER_ALIASES = {
  query: ["query", "queries", "top queries", "검색어", "쿼리"],
  page: ["page", "pages", "top pages", "페이지", "url", "landing page"],
  clicks: ["clicks", "클릭수", "클릭"],
  impressions: ["impressions", "노출수", "노출"],
  ctr: ["ctr", "클릭률"],
  position: [
    "position",
    "average position",
    "avg position",
    "게재순위",
    "평균 게재순위",
  ],
};

function normalizeHeader(value) {
  return value.trim().replace(/^\uFEFF/, "").toLowerCase();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (quoted) {
    throw new Error("unterminated quoted CSV field");
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  return rows.filter((values) =>
    values.some((value) => value.trim() !== ""),
  );
}

function headerIndex(headers, key, required = true) {
  const normalized = headers.map(normalizeHeader);
  const index = normalized.findIndex((header) =>
    HEADER_ALIASES[key].includes(header),
  );

  if (index < 0 && required) {
    throw new Error(`missing required CSV column: ${key}`);
  }

  return index;
}

function parseNumber(value, key) {
  const cleaned = String(value ?? "")
    .trim()
    .replaceAll(",", "")
    .replace(/%$/, "");

  if (!cleaned) {
    return 0;
  }

  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new Error(`invalid ${key}: ${value}`);
  }

  return parsed;
}

function loadExport(filename) {
  const rows = parseCsv(fs.readFileSync(filename, "utf8"));
  if (rows.length < 2) {
    throw new Error(`CSV has no data rows: ${filename}`);
  }

  const headers = rows[0];
  const indexes = {
    query: headerIndex(headers, "query"),
    page: headerIndex(headers, "page"),
    clicks: headerIndex(headers, "clicks"),
    impressions: headerIndex(headers, "impressions"),
    ctr: headerIndex(headers, "ctr", false),
    position: headerIndex(headers, "position", false),
  };

  return rows.slice(1).map((values, rowIndex) => {
    const query = (values[indexes.query] ?? "").trim();
    const page = (values[indexes.page] ?? "").trim();

    if (!query || !page) {
      throw new Error(`row ${rowIndex + 2}: query and page are required`);
    }

    const clicks = parseNumber(values[indexes.clicks], "clicks");
    const impressions = parseNumber(
      values[indexes.impressions],
      "impressions",
    );
    const exportedCtr =
      indexes.ctr >= 0 ? parseNumber(values[indexes.ctr], "ctr") : null;
    const ctr =
      impressions > 0 ? (clicks / impressions) * 100 : (exportedCtr ?? 0);
    const position =
      indexes.position >= 0
        ? parseNumber(values[indexes.position], "position")
        : null;

    return { query, page, clicks, impressions, ctr, position };
  });
}

function aggregateByQuery(rows) {
  const map = new Map();

  for (const row of rows) {
    const key = row.query.toLocaleLowerCase();
    const item = map.get(key) ?? {
      query: row.query,
      clicks: 0,
      impressions: 0,
      weightedPosition: 0,
      positionedImpressions: 0,
      pages: new Map(),
    };

    item.clicks += row.clicks;
    item.impressions += row.impressions;

    if (row.position != null && row.impressions > 0) {
      item.weightedPosition += row.position * row.impressions;
      item.positionedImpressions += row.impressions;
    }

    const page = item.pages.get(row.page) ?? {
      page: row.page,
      clicks: 0,
      impressions: 0,
    };
    page.clicks += row.clicks;
    page.impressions += row.impressions;
    item.pages.set(row.page, page);
    map.set(key, item);
  }

  return [...map.values()].map((item) => ({
    query: item.query,
    clicks: item.clicks,
    impressions: item.impressions,
    ctr: item.impressions > 0 ? (item.clicks / item.impressions) * 100 : 0,
    position:
      item.positionedImpressions > 0
        ? item.weightedPosition / item.positionedImpressions
        : null,
    pages: [...item.pages.values()].sort(
      (a, b) =>
        b.impressions - a.impressions ||
        b.clicks - a.clicks ||
        a.page.localeCompare(b.page),
    ),
  }));
}

function analyze(rows, options) {
  const queries = aggregateByQuery(rows);
  const opportunities = queries
    .filter(
      (item) =>
        item.impressions >= options.minImpressions &&
        item.ctr <= options.maxCtr,
    )
    .sort((a, b) => b.impressions - a.impressions || a.ctr - b.ctr)
    .map(({ pages, ...item }) => ({
      ...item,
      leadingPage: pages[0]?.page ?? null,
    }));

  const cannibalization = queries
    .map((item) => ({
      ...item,
      pages: item.pages.filter(
        (page) => page.impressions >= options.minPageImpressions,
      ),
    }))
    .filter((item) => item.pages.length >= 2)
    .sort(
      (a, b) =>
        b.impressions - a.impressions || b.pages.length - a.pages.length,
    )
    .map((item) => ({
      query: item.query,
      clicks: item.clicks,
      impressions: item.impressions,
      ctr: item.ctr,
      pages: item.pages,
      recommendation:
        "Inspect intent overlap before changing canonicals; consolidate metadata/content/internal links only when pages serve the same intent.",
    }));

  return {
    rowCount: rows.length,
    queryCount: queries.length,
    opportunities,
    cannibalization,
  };
}

function compare(current, baseline) {
  const baselineByQuery = new Map(
    aggregateByQuery(baseline).map((item) => [
      item.query.toLocaleLowerCase(),
      item,
    ]),
  );

  return aggregateByQuery(current)
    .map((item) => {
      const previous = baselineByQuery.get(item.query.toLocaleLowerCase());
      if (!previous) {
        return null;
      }

      return {
        query: item.query,
        impressionsDelta: item.impressions - previous.impressions,
        clicksDelta: item.clicks - previous.clicks,
        ctrDelta: item.ctr - previous.ctr,
        currentPages: item.pages.length,
        baselinePages: previous.pages.length,
      };
    })
    .filter(Boolean)
    .sort(
      (a, b) => Math.abs(b.impressionsDelta) - Math.abs(a.impressionsDelta),
    );
}

function parseArgs(argv) {
  const args = {
    minImpressions: 10,
    maxCtr: 2,
    minPageImpressions: 5,
    baseline: null,
    output: null,
  };
  const positionals = [];

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === "--baseline") {
      args.baseline = argv[++index];
    } else if (value === "--output") {
      args.output = argv[++index];
    } else if (value === "--min-impressions") {
      args.minImpressions = Number(argv[++index]);
    } else if (value === "--max-ctr") {
      args.maxCtr = Number(argv[++index]);
    } else if (value === "--min-page-impressions") {
      args.minPageImpressions = Number(argv[++index]);
    } else if (value.startsWith("--")) {
      throw new Error(`unknown option: ${value}`);
    } else {
      positionals.push(value);
    }
  }

  if (positionals.length !== 1) {
    throw new Error(
      "usage: node scripts/gsc-feedback.mjs <query-page.csv> [--baseline previous.csv] [--output report.json]",
    );
  }

  for (const key of ["minImpressions", "maxCtr", "minPageImpressions"]) {
    if (!Number.isFinite(args[key]) || args[key] < 0) {
      throw new Error(
        `invalid --${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`,
      );
    }
  }

  return { ...args, input: positionals[0] };
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const current = loadExport(options.input);
  const analysis = analyze(current, options);
  const report = {
    generatedAt: new Date().toISOString(),
    source: path.resolve(options.input),
    thresholds: {
      minImpressions: options.minImpressions,
      maxCtrPercent: options.maxCtr,
      minPageImpressions: options.minPageImpressions,
    },
    ...analysis,
    comparison: options.baseline
      ? compare(current, loadExport(options.baseline))
      : null,
    guardrails: [
      "Search Console evidence may reprioritize unstarted SEO/content work, not invent traffic or change calculator math.",
      "Multiple ranking pages are a review signal, not automatic proof that canonical consolidation is correct.",
      "Validate intent and live canonical/indexability behavior before merging page-consolidation changes.",
    ],
  };
  const serialized = `${JSON.stringify(report, null, 2)}\n`;

  if (options.output) {
    fs.writeFileSync(options.output, serialized);
  } else {
    process.stdout.write(serialized);
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
