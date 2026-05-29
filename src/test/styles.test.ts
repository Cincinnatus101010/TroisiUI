import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { buildStyles } from "../build-styles";

const root = join(import.meta.dirname, "../..");

describe("design system CSS", () => {
	it("tokens define explicit light and dark themes", async () => {
		const tokens = await readFile(join(root, "src/styles/tokens.css"), "utf8");
		expect(tokens).toContain('[data-troisi-theme="light"]');
		expect(tokens).toContain('[data-troisi-theme="dark"]');
		expect(tokens).toContain("color-scheme: light");
		expect(tokens).toContain("color-scheme: dark");
		expect(tokens).toContain("prefers-color-scheme: dark");
	});

	describe("bundled stylesheet", () => {
		beforeAll(async () => {
			await buildStyles(root);
		});

		it("includes components and theme selectors", async () => {
			const bundle = await readFile(
				join(root, "dist/styles/troisi-ui.css"),
				"utf8",
			);
			expect(bundle).toContain(".troisi-button");
			expect(bundle).toContain(".troisi-modal");
			expect(bundle).toContain('[data-troisi-theme="dark"]');
		});
	});
});
