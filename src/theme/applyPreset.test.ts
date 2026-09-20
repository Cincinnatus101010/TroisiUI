import { describe, expect, it } from "vitest";
import { applyPreset, readPreset } from "./applyPreset";
import { TROISI_PRESET_ATTR } from "./constants";

describe("applyPreset", () => {
	it("sets and clears preset attribute", () => {
		const el = document.createElement("div");
		applyPreset(el, "ocean");
		expect(el.getAttribute(TROISI_PRESET_ATTR)).toBe("ocean");
		applyPreset(el, "default");
		expect(el.hasAttribute(TROISI_PRESET_ATTR)).toBe(false);
	});

	it("reads preset from element", () => {
		const el = document.createElement("div");
		el.setAttribute(TROISI_PRESET_ATTR, "forest");
		expect(readPreset(el)).toBe("forest");
		expect(readPreset(document.createElement("div"))).toBe("default");
	});
});
