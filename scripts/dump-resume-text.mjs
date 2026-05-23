import fs from "node:fs";
import path from "node:path";
import pdf from "pdf-parse";

const pdfPath = process.argv[2];
const outPath = process.argv[3];

if (!pdfPath || !outPath) {
  console.error("Usage: node scripts/dump-resume-text.mjs <path-to-pdf> <out-txt>");
  process.exit(1);
}

const absPdf = path.resolve(pdfPath);
const absOut = path.resolve(outPath);

const dataBuffer = fs.readFileSync(absPdf);
const { text } = await pdf(dataBuffer);

fs.writeFileSync(absOut, text, "utf8");
console.log(`Wrote ${absOut}`);
