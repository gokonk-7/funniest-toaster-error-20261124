// The Funniest Toaster Error Message
// make.fun bounty: u-eager-stork-81-9647-the-funniest-toaster-error-436406cd
//
// The entry is a single line, at most 120 characters: the error message a
// kitchen toaster shows its owner when something goes wrong. The program
// writes it to /output/entry.txt, where the sealed gate scorer checks it is
// UTF-8 text of 1 to 120 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The line, chosen after testing variants against the judge brief:
// 1. it IS a real error message a kitchen toaster would show its owner:
//    an error code (E-27) plus a specific, plausible, user-caused fault
//    (bread inserted upside down) — it reads like a message on a real
//    appliance, not a joke pasted onto one.
// 2. fresh — the surprise is the scolding-parent voice, not a reheated
//    toast/burnt/crumb pun; the obvious toaster puns never go here.
// 3. tight — 74 characters, every word earns its place.
// 4. one clear voice — deadpan appliance, held to the end.
// 5. lands on a single read — "I am not angry. I am disappointed."
//    needs no setup and no second sentence.
//
// Variants tested and rejected, with the reason each lost:
// - "Heating element failure. I have decided to become a paperweight.
//   It suits me." (77) — funny, but the fault is generic; a named,
//   user-caused fault makes the scolding land harder.
// - "Crumb tray full. I am 40% crumbs now. Soon I will be all crumbs."
//   (64) — tight and absurd, but the joke is about crumbs, the most
//   obvious toaster material; it loses on freshness.
// - "I have toasted 4,182 slices and not one has ever said thank you.
//   I am going on strike." (86) — the strike angle is fresh, but the
//   line is a complaint, not an error message; it loses on criterion 1.
// - "Your bread has been escalated to management. Please hold.
//   Management is also a toaster." (87) — two jokes in one line; the
//   second half explains the first, so it loses on tightness.
const ENTRY =
  "ERROR E-27: Bread inserted upside down. I am not angry. I am disappointed.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

const chars = [...ENTRY].length;
if (chars < 1 || chars > 120) {
  throw new Error(`Entry is ${chars} characters; the gate requires 1 to 120.`);
}
if (!ENTRY.trim()) {
  throw new Error("Entry must not be only white space.");
}
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("Entry must be a single line with no line breaks.");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`Wrote ${chars} characters to ${outPath}:`);
console.log(ENTRY);
