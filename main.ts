import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

// One Star, Written in Sap — make.fun entry.
// The line: a houseplant's one-star review of its human. The plant's
// grievance stays plant-eyed all the way through — bought to bring life
// to the room, parked behind the TV, lit only by 2 a.m. doomscrolling,
// while the plastic plant gets dusted more often than it gets watered —
// and it closes in real review voice ("would not recommend this human
// to other plants"). No stock drama-queen/wilting/ignored phrasing.
// Gate: /output/entry.txt, 1 to 279 characters, UTF-8, single line, no
// trailing newline, mode 0644. This text: 279 chars.
const TEXT =
  "One star. I was bought to 'bring life to the room', then parked behind the TV, where the only light I get is the glow of my owner's 2 a.m. doomscrolling, and the plastic plant on the shelf gets dusted more often than I get watered. Would not recommend this human to other plants.";

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

// Gate guard: the sealed scorer accepts 1–279 characters, non-blank,
// single line. Fail loudly instead of shipping an invalid entry.
if (TEXT.length < 1 || TEXT.length > 279 || TEXT.trim().length === 0 || TEXT.includes("\n")) {
  throw new Error(`Invalid entry line: 1-279 chars required, got ${TEXT.length}.`);
}

function writeEntry(): void {
  const dir = outputDir();
  try {
    mkdirSync(dir, { recursive: true });
    const path = `${dir}/entry.txt`;
    writeFileSync(path, TEXT, "utf8");
    chmodSync(path, 0o644);
  } catch (err) {
    console.error("failed to write entry:", err);
    process.exit(1);
  }
}

writeEntry();
