import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import type { TroisiTheme } from "../theme/constants";

interface TestProviderProps {
	children: ReactNode;
	theme?: TroisiTheme;
}

function TestProviders({ children, theme = "light" }: TestProviderProps) {
	return (
		<ThemeProvider theme={theme} target={document.documentElement}>
			<div className="troisi-root">{children}</div>
		</ThemeProvider>
	);
}

export function renderWithTroisi(
	ui: ReactElement,
	options?: RenderOptions & { theme?: TroisiTheme },
) {
	const { theme, ...rest } = options ?? {};
	return render(ui, {
		wrapper: ({ children }) => (
			<TestProviders theme={theme}>{children}</TestProviders>
		),
		...rest,
	});
}
