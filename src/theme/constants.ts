export const TROISI_THEME_ATTR = "data-troisi-theme" as const;
export const TROISI_PRESET_ATTR = "data-troisi-preset" as const;

export type TroisiTheme = "light" | "dark" | "system";

export type TroisiResolvedTheme = "light" | "dark";

export const TROISI_PRESETS = [
	"default",
	"ocean",
	"forest",
	"rose",
	"high-contrast",
] as const;

export type TroisiPreset = (typeof TROISI_PRESETS)[number];
