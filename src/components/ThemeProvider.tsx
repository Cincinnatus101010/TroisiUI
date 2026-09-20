"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { applyPreset, applyPresetToDocument } from "../theme/applyPreset";
import {
	applyTheme,
	applyThemeToDocument,
	resolveTheme,
} from "../theme/applyTheme";
import type {
	TroisiPreset,
	TroisiResolvedTheme,
	TroisiTheme,
} from "../theme/constants";

export interface ThemeProviderProps {
	children: ReactNode;
	/** Controlled theme */
	theme?: TroisiTheme;
	defaultTheme?: TroisiTheme;
	onThemeChange?: (theme: TroisiTheme) => void;
	/** Persist to localStorage */
	storageKey?: string;
	preset?: TroisiPreset;
	defaultPreset?: TroisiPreset;
	onPresetChange?: (preset: TroisiPreset) => void;
	/** Persist accent preset (defaults to `${storageKey}-preset` when storageKey is set) */
	presetStorageKey?: string;
	/** Element that receives data-troisi-theme (default: document.documentElement) */
	target?: HTMLElement | null;
}

interface ThemeContextValue {
	theme: TroisiTheme;
	setTheme: (theme: TroisiTheme) => void;
	resolvedTheme: TroisiResolvedTheme;
	preset: TroisiPreset;
	setPreset: (preset: TroisiPreset) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(key: string): TroisiTheme | null {
	try {
		const value = localStorage.getItem(key);
		if (value === "light" || value === "dark" || value === "system")
			return value;
	} catch {
		/* private mode / SSR */
	}
	return null;
}

function readStoredPreset(key: string): TroisiPreset | null {
	try {
		const value = localStorage.getItem(key);
		if (
			value === "default" ||
			value === "ocean" ||
			value === "forest" ||
			value === "rose" ||
			value === "high-contrast"
		) {
			return value;
		}
	} catch {
		/* private mode / SSR */
	}
	return null;
}

export function ThemeProvider({
	children,
	theme: controlledTheme,
	defaultTheme = "system",
	onThemeChange,
	storageKey,
	preset: controlledPreset,
	defaultPreset = "default",
	onPresetChange,
	presetStorageKey,
	target,
}: ThemeProviderProps) {
	// Always match SSR / first client paint; storage is applied in useLayoutEffect below.
	const [uncontrolledTheme, setUncontrolledTheme] =
		useState<TroisiTheme>(defaultTheme);
	const [uncontrolledPreset, setUncontrolledPreset] =
		useState<TroisiPreset>(defaultPreset);

	const [prefersDark, setPrefersDark] = useState(false);

	const theme = controlledTheme ?? uncontrolledTheme;
	const preset = controlledPreset ?? uncontrolledPreset;
	const resolvedTheme = resolveTheme(theme, prefersDark);
	const resolvedPresetKey =
		presetStorageKey ?? (storageKey ? `${storageKey}-preset` : undefined);

	const setTheme = useCallback(
		(next: TroisiTheme) => {
			if (controlledTheme === undefined) setUncontrolledTheme(next);
			if (storageKey) {
				try {
					localStorage.setItem(storageKey, next);
				} catch {
					/* ignore */
				}
			}
			onThemeChange?.(next);
		},
		[controlledTheme, onThemeChange, storageKey],
	);

	const setPreset = useCallback(
		(next: TroisiPreset) => {
			if (controlledPreset === undefined) setUncontrolledPreset(next);
			if (resolvedPresetKey) {
				try {
					localStorage.setItem(resolvedPresetKey, next);
				} catch {
					/* ignore */
				}
			}
			onPresetChange?.(next);
		},
		[controlledPreset, onPresetChange, resolvedPresetKey],
	);

	const storageSynced = useRef(false);
	const presetStorageSynced = useRef(false);

	useLayoutEffect(() => {
		let activeTheme = theme;

		if (!storageSynced.current && storageKey && controlledTheme === undefined) {
			storageSynced.current = true;
			const stored = readStoredTheme(storageKey);
			if (stored) {
				activeTheme = stored;
				if (stored !== uncontrolledTheme) {
					setUncontrolledTheme(stored);
				}
			}
		}

		let activePreset = preset;

		if (
			!presetStorageSynced.current &&
			resolvedPresetKey &&
			controlledPreset === undefined
		) {
			presetStorageSynced.current = true;
			const storedPreset = readStoredPreset(resolvedPresetKey);
			if (storedPreset) {
				activePreset = storedPreset;
				if (storedPreset !== uncontrolledPreset) {
					setUncontrolledPreset(storedPreset);
				}
			}
		}

		if (target) {
			applyTheme(target, activeTheme);
			applyPreset(target, activePreset);
		} else {
			applyThemeToDocument(activeTheme);
			applyPresetToDocument(activePreset);
		}
	}, [
		theme,
		preset,
		target,
		storageKey,
		controlledTheme,
		uncontrolledTheme,
		controlledPreset,
		uncontrolledPreset,
		resolvedPresetKey,
	]);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => setPrefersDark(mq.matches);
		onChange();
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	const value = useMemo(
		() => ({ theme, setTheme, resolvedTheme, preset, setPreset }),
		[theme, setTheme, resolvedTheme, preset, setPreset],
	);

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
}

export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return ctx;
}
