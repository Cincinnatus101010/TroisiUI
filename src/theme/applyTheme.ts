import {
	TROISI_THEME_ATTR,
	type TroisiResolvedTheme,
	type TroisiTheme,
} from "./constants";

export function getSystemPrefersDark(
	matchMedia: (query: string) => MediaQueryList = globalThis.matchMedia,
): boolean {
	return matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolveTheme(
	theme: TroisiTheme,
	prefersDark = getSystemPrefersDark(),
): TroisiResolvedTheme {
	if (theme === "system") return prefersDark ? "dark" : "light";
	return theme;
}

/** Apply theme attribute to a single element. */
export function applyTheme(element: HTMLElement, theme: TroisiTheme): void {
	if (theme === "system") {
		element.removeAttribute(TROISI_THEME_ATTR);
		return;
	}
	element.setAttribute(TROISI_THEME_ATTR, theme);
}

/** Sync theme on <html> and <body> so system media queries cannot override light mode on .troisi-root. */
export function applyThemeToDocument(theme: TroisiTheme): void {
	const html = document.documentElement;
	applyTheme(html, theme);
	if (document.body) {
		applyTheme(document.body, theme);
	}
}

export function readTheme(element: HTMLElement): TroisiTheme {
	const value = element.getAttribute(TROISI_THEME_ATTR);
	if (value === "light" || value === "dark") return value;
	return "system";
}
