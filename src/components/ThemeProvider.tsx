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
import {
	applyTheme,
	applyThemeToDocument,
	resolveTheme,
} from "../theme/applyTheme";
import type { TroisiResolvedTheme, TroisiTheme } from "../theme/constants";

export interface ThemeProviderProps {
	children: ReactNode;
	/** Controlled theme */
	theme?: TroisiTheme;
	defaultTheme?: TroisiTheme;
	onThemeChange?: (theme: TroisiTheme) => void;
	/** Persist to localStorage */
	storageKey?: string;
	/** Element that receives data-troisi-theme (default: document.documentElement) */
	target?: HTMLElement | null;
}

interface ThemeContextValue {
	theme: TroisiTheme;
	setTheme: (theme: TroisiTheme) => void;
	resolvedTheme: TroisiResolvedTheme;
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

export function ThemeProvider({
	children,
	theme: controlledTheme,
	defaultTheme = "system",
	onThemeChange,
	storageKey,
	target,
}: ThemeProviderProps) {
	// Always match SSR / first client paint; storage is applied in useLayoutEffect below.
	const [uncontrolledTheme, setUncontrolledTheme] =
		useState<TroisiTheme>(defaultTheme);

	const [prefersDark, setPrefersDark] = useState(false);

	const theme = controlledTheme ?? uncontrolledTheme;
	const resolvedTheme = resolveTheme(theme, prefersDark);

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

	const storageSynced = useRef(false);

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

		if (target) {
			applyTheme(target, activeTheme);
		} else {
			applyThemeToDocument(activeTheme);
		}
	}, [theme, target, storageKey, controlledTheme, uncontrolledTheme]);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => setPrefersDark(mq.matches);
		onChange();
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	const value = useMemo(
		() => ({ theme, setTheme, resolvedTheme }),
		[theme, setTheme, resolvedTheme],
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
