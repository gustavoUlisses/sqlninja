import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";

const datasetSrc = fs.readFileSync("data/datasets/junior.ts", "utf8");
const exSrc = fs.readFileSync("data/exercicios/junior.ts", "utf8");

const seedMatch = datasetSrc.match(/seed:\s*`([\s\S]*?)`\.trim\(\)/);
if (!seedMatch) {
  console.error("Seed não encontrado");
  process.exit(1);
}
const seedSQL = seedMatch[1].trim();

const gabaritoRe = /id:\s*"(jr-\d{3})"[\s\S]*?gabarito:\s*"([^"]*(?:\\.[^"]*)*)"/g;
const exercicios = [];
let m;
while ((m = gabaritoRe.exec(exSrc)) !== null) {
  const id = m[1];
  const gab = m[2]
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\n/g, "\n");
  exercicios.push({ id, gabarito: gab });
}

console.log(`Encontrados ${exercicios.length} exercícios\n`);

const SQL = await initSqlJs({
  locateFile: (f) => path.join("node_modules/sql.js/dist", f),
});

let pass = 0,
  fail = 0,
  zero = 0;
const failures = [];
const zeroResults = [];

for (const ex of exercicios) {
  const db = new SQL.Database();
  try {
    db.run(seedSQL);
    const result = db.exec(ex.gabarito);
    if (result.length === 0) {
      console.log(`⚠ ${ex.id} — retornou nada`);
      zero++;
      zeroResults.push(ex);
    } else {
      const rows = result[0].values.length;
      const cols = result[0].columns.length;
      console.log(`✓ ${ex.id} — ${cols} col × ${rows} linha(s)`);
      pass++;
    }
  } catch (err) {
    console.log(`✗ ${ex.id} — ${err.message}`);
    failures.push({ id: ex.id, gabarito: ex.gabarito, err: err.message });
    fail++;
  } finally {
    db.close();
  }
}

console.log(`\n${pass} pass, ${fail} fail, ${zero} sem resultado`);

if (failures.length) {
  console.log("\n=== Falhas ===");
  for (const f of failures) {
    console.log(`\n${f.id}:`);
    console.log(`  SQL: ${f.gabarito}`);
    console.log(`  Err: ${f.err}`);
  }
}

if (zeroResults.length) {
  console.log("\n=== Sem resultado (revisar dados) ===");
  for (const z of zeroResults) {
    console.log(`  ${z.id}: ${z.gabarito}`);
  }
}

process.exit(fail > 0 ? 1 : 0);
