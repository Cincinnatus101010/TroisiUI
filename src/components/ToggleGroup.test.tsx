import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTroisi } from "../test/render";
import { ToggleGroup } from "./ToggleGroup";

const OPTIONS = [
	{ value: "list", label: "List" },
	{ value: "grid", label: "Grid" },
];

describe("ToggleGroup", () => {
	it("updates uncontrolled selection when an option is clicked", async () => {
		const user = userEvent.setup();
		const { container } = renderWithTroisi(
			<ToggleGroup aria-label="Layout" defaultValue="list" options={OPTIONS} />,
		);
		await user.click(screen.getByRole("radio", { name: "Grid" }));
		expect(
			container.querySelector(".troisi-toggle-group__item--checked")
				?.textContent,
		).toContain("Grid");
	});

	it("calls onValueChange in controlled mode", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();
		renderWithTroisi(
			<ToggleGroup
				aria-label="Layout"
				value="list"
				onValueChange={onValueChange}
				options={OPTIONS}
			/>,
		);
		await user.click(screen.getByRole("radio", { name: "Grid" }));
		expect(onValueChange).toHaveBeenCalledWith("grid");
	});
});
