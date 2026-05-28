/**
 * Valida todos os gabaritos dos exercícios executando-os no sql.js real.
 * Estratégia: em vez de fazer parse do TypeScript, usa o compilador do Next.js
 * via um pequeno truque — extrai o dataset e os exercícios com regex
 * tolerante a aspas múltiplas.
 */
import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";

// ── 1. Extrair seed do dataset ───────────────────────────────────────────────
const datasetSrc = fs.readFileSync("data/datasets/junior.ts", "utf8");
const seedMatch = datasetSrc.match(/seed:\s*`([\s\S]*?)`\.trim\(\)/);
if (!seedMatch) {
  console.error("Seed não encontrado no dataset");
  process.exit(1);
}
const seedSQL = seedMatch[1].trim();

// ── 2. Extrair gabaritos usando delimitadores mais robustos ──────────────────
const exSrc = fs.readFileSync("data/exercicios/junior.ts", "utf8");

// Encontra todos os blocos id + gabarito usando uma janela maior
const exercicios = [];
const idRe = /id:\s*"(jr-\d{3})"/g;
let m;
while ((m = idRe.exec(exSrc)) !== null) {
  const id = m[1];
  const startPos = m.index;

  // Acha o próximo "gabarito:" após esse id
  const slice = exSrc.slice(startPos, startPos + 3000);
  const gabMatch = slice.match(/gabarito:\s*"((?:[^"\\]|\\.)*)"/);

  if (!gabMatch) {
    console.log(`⚠ ${id} — gabarito não encontrado`);
    continue;
  }

  const gab = gabMatch[1]
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t");

  exercicios.push({ id, gabarito: gab });
}

console.log(`Encontrados ${exercicios.length} exercícios\n`);

// ── 3. Executar cada gabarito ────────────────────────────────────────────────
const SQL = await initSqlJs({
  locateFile: (f) => path.join("node_modules/sql.js/dist", f),
});

let pass = 0, fail = 0, zero = 0;
const failures = [];
const zeroResults = [];

for (const ex of exercicios) {
  const db = new SQL.Database();
  try {
    db.run(seedSQL);
    const result = db.exec(ex.gabarito);
    if (result.length === 0) {
      // Pode ser um COUNT que retornou 0 linhas ou query de agregação vazia
      // Tenta novamente verificando se não deu erro
      console.log(`⚠ ${ex.id} — retornou conjunto vazio (pode ser COUNT=0 legítimo)`);
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

console.log(`\n${pass} pass, ${fail} fail, ${zero} com resultado vazio`);

if (failures.length) {
  console.log("\n=== Falhas ===");
  for (const f of failures) {
    console.log(`\n${f.id}:`);
    console.log(`  SQL: ${f.gabarito}`);
    console.log(`  Err: ${f.err}`);
  }
}

if (zeroResults.length) {
  console.log("\n=== Resultado vazio (revisar se esperado) ===");
  for (const z of zeroResults) {
    console.log(`  ${z.id}: ${z.gabarito.slice(0, 80)}`);
  }
}

process.exit(fail > 0 ? 1 : 0);
