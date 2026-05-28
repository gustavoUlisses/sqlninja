import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";

const datasetSrc = fs.readFileSync("data/datasets/pleno.ts", "utf8");
const seedMatch = datasetSrc.match(/const SEED = `([\s\S]*?)`.trim\(\)/);
const seedSQL = seedMatch[1].trim();

const exSrc = fs.readFileSync("data/exercicios/pleno.ts", "utf8");
const exercicios = [];
const idRe = /id:\s*"(pl-\d{3})"/g;
let m;
while ((m = idRe.exec(exSrc)) !== null) {
  const id = m[1];
  const startPos = m.index;
  const slice = exSrc.slice(startPos, startPos + 3000);
  // Find gabarito: "..." — extract value between quotes
  const gabIdx = slice.indexOf('gabarito:');
  if (gabIdx === -1) { console.log("no gabarito: " + id); continue; }
  const afterGab = slice.slice(gabIdx);
  const firstQuote = afterGab.indexOf('"');
  let gab = '';
  let i = firstQuote + 1;
  while (i < afterGab.length) {
    if (afterGab[i] === '\\' && afterGab[i+1] === '"') { gab += '"'; i += 2; continue; }
    if (afterGab[i] === '"') break;
    gab += afterGab[i];
    i++;
  }
  exercicios.push({ id, gabarito: gab });
}
console.log("Encontrados " + exercicios.length + " exercícios\n");

const SQL = await initSqlJs({ locateFile: f => path.join("node_modules/sql.js/dist", f) });
let pass = 0, fail = 0, zero = 0;
const failures = [];

for (const ex of exercicios) {
  const db = new SQL.Database();
  try {
    db.run(seedSQL);
    const result = db.exec(ex.gabarito);
    if (result.length === 0) {
      console.log("⚠ " + ex.id + " — resultado vazio");
      zero++;
    } else {
      const rows = result[0].values.length;
      const cols = result[0].columns.length;
      console.log("✓ " + ex.id + " — " + cols + " col × " + rows + " linha(s)");
      pass++;
    }
  } catch (err) {
    console.log("✗ " + ex.id + " — " + err.message);
    failures.push({ id: ex.id, gab: ex.gabarito.slice(0, 100), err: err.message });
    fail++;
  } finally { db.close(); }
}

console.log("\n" + pass + " pass, " + fail + " fail, " + zero + " vazio(s)");
if (failures.length) {
  console.log("\n=== Falhas ===");
  for (const f of failures) console.log(f.id + ": " + f.err + "\n  " + f.gab);
}
process.exit(fail > 0 ? 1 : 0);
