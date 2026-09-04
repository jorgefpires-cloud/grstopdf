import { inspectGRS, formatReport } from "./grs-parser.js";
import { makeTestPdf } from "./pdf-writer.js";

const drop = document.querySelector("#drop");
const input = document.querySelector("#file");
const inspect = document.querySelector("#inspect");
const pdf = document.querySelector("#pdf");
const output = document.querySelector("#output");
const filename = document.querySelector("#filename");
let file = null;

function pick(next) {
  if (!next) return;
  if (!next.name.toLowerCase().endsWith(".grs")) {
    output.textContent = "Please choose a file whose name ends in .GRS.";
    return;
  }
  file = next;
  filename.textContent = `${file.name} — ${file.size.toLocaleString()} bytes`;
  inspect.disabled = pdf.disabled = false;
  output.textContent = `Selected ${file.name}. Click “Inspect GRS” to read it locally.`;
}

input.addEventListener("change", () => pick(input.files?.[0]));
drop.addEventListener("click", () => input.click());
drop.addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); }
});
drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("drag"); });
drop.addEventListener("dragleave", () => drop.classList.remove("drag"));
drop.addEventListener("drop", e => {
  e.preventDefault();
  drop.classList.remove("drag");
  pick(e.dataTransfer?.files?.[0]);
});

inspect.addEventListener("click", async () => {
  if (!file) return;
  try {
    output.textContent = "Reading locally…";
    output.textContent = formatReport(inspectGRS(await file.arrayBuffer(), file.name));
  } catch (err) {
    output.textContent = `Could not read the file locally.\n\n${err?.stack || err}`;
  }
});

pdf.addEventListener("click", () => {
  if (!file) return;
  const blob = makeTestPdf(file.name);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name.replace(/\.grs$/i, "") + "-test.pdf";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

window.addEventListener("error", e => {
  output.textContent = `Application error:\n\n${e.message || e.error || "Unknown error"}`;
});
