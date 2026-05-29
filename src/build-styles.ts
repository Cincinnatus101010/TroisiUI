import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const STYLE_FILES = [
	"tokens.css",
	"reset.css",
	"components.css",
	"components-layout.css",
	"components-forms.css",
	"components-navigation.css",
	"components-feedback.css",
	"components-data.css",
	"components-media.css",
	"components-utility.css",
] as const;

export async function buildStyles(root = process.cwd()) {
	const stylesRoot = join(root, "src/styles");
	const outDir = join(root, "dist/styles");
	const css = await Promise.all(
		STYLE_FILES.map((f) => readFile(join(stylesRoot, f), "utf8")),
	);
	await mkdir(outDir, { recursive: true });
	await writeFile(join(outDir, "troisi-ui.css"), css.join("\n\n"), "utf8");
}
