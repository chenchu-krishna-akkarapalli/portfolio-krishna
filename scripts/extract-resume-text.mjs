import fs from "node:fs";
import path from "node:path";
import pdf from "pdf-parse";

const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error("Usage: node scripts/extract-resume-text.mjs <path-to-pdf>");
  process.exit(1);
}

const abs = path.resolve(pdfPath);
const dataBuffer = fs.readFileSync(abs);

const { text } = await pdf(dataBuffer);

const needles = [
  "multi",
  "tenant",
  "hr",
  "human",
  "civil",
  "cad",
  "blog",
  "publishing",
  "insurance",
];

const lines = text
  .split(/\r?\n/)
  .map((l) => l.replace(/\s+/g, " ").trim())
  .filter(Boolean);

const hitLines = lines.filter((line) =>
  needles.some((n) => line.toLowerCase().includes(n)),
);

// Deduplicate while preserving order
const seen = new Set();
const unique = [];
for (const l of hitLines) {
  const key = l.toLowerCase();
  if (seen.has(key)) continue;
  seen.add(key);
  unique.push(l);
}

console.log(unique.join("\n"));
