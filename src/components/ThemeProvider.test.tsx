import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TROISI_THEME_ATTR } from "../theme/constants";
import { ThemeProvider, useTheme } from "./ThemeProvider";

function ThemeConsumer() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	return (
		<div>
			<span data-testid="theme">{theme}</span>
			<span data-testid="resolved">{resolvedTheme}</span>
			<button type="button" onClick={() => setTheme("dark")}>
				go dark
			</button>
		</div>
	);
}

describe("ThemeProvider", () => {
	it("applies light theme to document element", () => {
		render(
			<ThemeProvider theme="light" target={document.documentElement}>
				<ThemeConsumer />
			</ThemeProvider>,
		);
		expect(document.documentElement.getAttribute(TROISI_THEME_ATTR)).toBe(
			"light",
		);
	});

	it("applies dark theme when set", async () => {
		const user = userEvent.setup();
		render(
			<ThemeProvider defaultTheme="light" target={document.documentElement}>
				<ThemeConsumer />
			</ThemeProvider>,
		);
		await user.click(screen.getByRole("button", { name: /go dark/i }));
		expect(document.documentElement.getAttribute(TROISI_THEME_ATTR)).toBe(
			"dark",
		);
		expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
	});

	it("removes attribute for system theme", () => {
		render(
			<ThemeProvider theme="system" target={document.documentElement}>
				<div />
			</ThemeProvider>,
		);
		expect(document.documentElement.hasAttribute(TROISI_THEME_ATTR)).toBe(
			false,
		);
	});
});
