#!/usr/bin/env node
import fs from "fs";
import crypto from "crypto";

const [,, intentRaw, inputsJson] = process.argv;
if (!intentRaw) { console.error("Usage: agent-log <intent> [inputs-json]"); process.exit(1); }

const intent = intentRaw.trim();
let inputs = {};
try { if (inputsJson) inputs = JSON.parse(inputsJson); } catch { /* ignore */ }

const utc = new Date();
const id = utc.toISOString().replace(/[-:TZ.]/g,"").slice(0,12) + "-" + intent.replace(/\s+/g,"-").toLowerCase().slice(0,28);
const fp = crypto.createHash("sha256").update(JSON.stringify({intent, inputs}), "utf8").digest("hex");

const ledgerPath = "docs/agents/ledger.json";
const arr = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));

const dup = arr.find(e => e.fingerprint === `sha256:${fp}` && e.status === "done");
if (dup) {
  arr.push({ id, actor: "agent:cursor", intent, inputs, fingerprint:`sha256:${fp}`, status:"skipped-duplicate", evidence:{prior:dup.id}, notes:["Auto-skip duplicate"] });
  fs.writeFileSync(ledgerPath, JSON.stringify(arr, null, 2));
  console.log(`Skipped duplicate (prior: ${dup.id})`);
  process.exit(0);
}

// basic related files via git diff (staged)
const related = (fs.existsSync(".git") ? require("child_process").execSync("git diff --cached --name-only || true").toString().trim().split("\n").filter(Boolean) : []);

arr.push({
  id,
  actor: "agent:cursor",
  intent,
  inputs,
  fingerprint:`sha256:${fp}`,
  relatedFiles: related,
  status: "done",
  evidence: { commit: (process.env.GIT_COMMIT || "").slice(0,7) || null },
  notes: []
});

fs.writeFileSync(ledgerPath, JSON.stringify(arr, null, 2));
console.log(`Logged: ${id}`);
