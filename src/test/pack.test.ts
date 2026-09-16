import { access } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import pkg from "../../package.json";

const root = join(import.meta.dirname, "../..");

async function expectFile(relativePath: string) {
	const path = join(root, relativePath.replace(/^\.\//, ""));
	await expect(access(path)).resolves.toBeUndefined();
}

describe("npm package layout", () => {
	it("declares entry points that exist after build", async () => {
		await expectFile(pkg.main);
		await expectFile(pkg.types);

		const exports = pkg.exports as Record<
			string,
			{ types?: string; import?: string } | string
		>;

		for (const value of Object.values(exports)) {
			if (typeof value === "string") {
				await expectFile(value);
				continue;
			}
			if (value.import) await expectFile(value.import);
			if (value.types) await expectFile(value.types);
		}
	});

	it("ships only built artifacts", () => {
		expect(pkg.files).toEqual(["dist"]);
	});
});
