import { TROISI_PRESET_ATTR, type TroisiPreset } from "./constants";

export function applyPreset(element: HTMLElement, preset: TroisiPreset): void {
	if (preset === "default") {
		element.removeAttribute(TROISI_PRESET_ATTR);
		return;
	}
	element.setAttribute(TROISI_PRESET_ATTR, preset);
}

/** Sync preset on `<html>` and `<body>` (mirrors applyThemeToDocument). */
export function applyPresetToDocument(preset: TroisiPreset): void {
	const html = document.documentElement;
	applyPreset(html, preset);
	if (document.body) {
		applyPreset(document.body, preset);
	}
}

export function readPreset(element: HTMLElement): TroisiPreset {
	const value = element.getAttribute(TROISI_PRESET_ATTR);
	if (
		value === "ocean" ||
		value === "forest" ||
		value === "rose" ||
		value === "high-contrast"
	) {
		return value;
	}
	return "default";
}
