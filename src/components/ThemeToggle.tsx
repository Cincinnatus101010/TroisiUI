"use client";

import type { ButtonHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";
import { Button } from "./Button";
import { useTheme } from "./ThemeProvider";

export interface ThemeToggleProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
	/** Include system in the light → dark → system cycle. */
	includeSystem?: boolean;
}

export function ThemeToggle({
	className,
	includeSystem = false,
	...props
}: ThemeToggleProps) {
	const { theme, setTheme, resolvedTheme } = useTheme();

	const label =
		resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme";

	const cycle = () => {
		if (includeSystem) {
			if (theme === "light") setTheme("dark");
			else if (theme === "dark") setTheme("system");
			else setTheme("light");
			return;
		}
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			type="button"
			variant="ghost"
			size="sm"
			className={joinClasses("troisi-theme-toggle", className)}
			aria-label={label}
			onClick={cycle}
			{...props}
		>
			{resolvedTheme === "dark" ? "Light" : "Dark"}
		</Button>
	);
}
