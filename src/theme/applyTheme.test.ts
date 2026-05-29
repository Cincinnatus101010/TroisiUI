import { describe, expect, it, vi } from "vitest";
import {
	applyTheme,
	getSystemPrefersDark,
	readTheme,
	resolveTheme,
} from "./applyTheme";
import { TROISI_THEME_ATTR } from "./constants";

describe("theme utilities", () => {
	it("resolveTheme returns light/dark for explicit themes", () => {
		expect(resolveTheme("light", true)).toBe("light");
		expect(resolveTheme("dark", false)).toBe("dark");
	});

	it("resolveTheme follows system preference", () => {
		expect(resolveTheme("system", true)).toBe("dark");
		expect(resolveTheme("system", false)).toBe("light");
	});

	it("applyTheme sets and removes data attribute", () => {
		const el = document.createElement("div");
		applyTheme(el, "dark");
		expect(el.getAttribute(TROISI_THEME_ATTR)).toBe("dark");
		applyTheme(el, "light");
		expect(el.getAttribute(TROISI_THEME_ATTR)).toBe("light");
		applyTheme(el, "system");
		expect(el.hasAttribute(TROISI_THEME_ATTR)).toBe(false);
	});

	it("readTheme reads attribute or system", () => {
		const el = document.createElement("div");
		el.setAttribute(TROISI_THEME_ATTR, "dark");
		expect(readTheme(el)).toBe("dark");
		el.removeAttribute(TROISI_THEME_ATTR);
		expect(readTheme(el)).toBe("system");
	});

	it("getSystemPrefersDark uses matchMedia", () => {
		const matchMedia = vi.fn(() => ({ matches: true }) as MediaQueryList);
		expect(getSystemPrefersDark(matchMedia)).toBe(true);
	});
});
