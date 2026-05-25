import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const targets = [
  ".agents/skills/pmf-radar",
  ".claude/skills/pmf-radar",
  ".cursor/skills/pmf-radar",
  ".gemini/skills/pmf-radar",
  ".github/skills/pmf-radar",
  ".kiro/skills/pmf-radar",
  ".opencode/skills/pmf-radar",
  ".pi/skills/pmf-radar",
  ".qoder/skills/pmf-radar",
  ".rovodev/skills/pmf-radar",
  ".trae-cn/skills/pmf-radar",
  ".trae/skills/pmf-radar"
];

const source = path.join(process.cwd(), "skills", "pmf-radar");

for (const target of targets) {
  const destination = path.join(process.cwd(), target);
  await mkdir(path.dirname(destination), { recursive: true });
  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { recursive: true });
  console.log(`synced ${target}`);
}
