import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTroisi } from "../test/render";
import { Combobox } from "./Combobox";

const OPTIONS = [
	{ value: "eng", label: "Engineer" },
	{ value: "des", label: "Designer" },
	{ value: "pm", label: "Product" },
];

describe("Combobox", () => {
	it("opens a listbox with all options on click", async () => {
		const user = userEvent.setup();
		renderWithTroisi(
			<Combobox
				aria-label="Role"
				options={OPTIONS}
				placeholder="Select role"
			/>,
		);
		const input = screen.getByRole("combobox", { name: "Role" });
		await user.click(input);
		expect(screen.getByRole("listbox")).toBeInTheDocument();
		expect(screen.getAllByRole("option")).toHaveLength(3);
	});

	it("filters options as the user types", async () => {
		const user = userEvent.setup();
		renderWithTroisi(<Combobox aria-label="Role" options={OPTIONS} />);
		const input = screen.getByRole("combobox", { name: "Role" });
		await user.click(input);
		await user.type(input, "des");
		expect(
			screen.getByRole("option", { name: "Designer" }),
		).toBeInTheDocument();
		expect(
			screen.queryByRole("option", { name: "Engineer" }),
		).not.toBeInTheDocument();
	});

	it("selects an option and notifies onValueChange", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();
		renderWithTroisi(
			<Combobox
				aria-label="Role"
				options={OPTIONS}
				onValueChange={onValueChange}
			/>,
		);
		const input = screen.getByRole("combobox", { name: "Role" });
		await user.click(input);
		await user.click(screen.getByRole("option", { name: "Designer" }));
		expect(onValueChange).toHaveBeenCalledWith("des");
		expect(input).toHaveValue("Designer");
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("selects the highlighted option with Enter", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();
		renderWithTroisi(
			<Combobox
				aria-label="Role"
				options={OPTIONS}
				onValueChange={onValueChange}
			/>,
		);
		const input = screen.getByRole("combobox", { name: "Role" });
		await user.click(input);
		await user.keyboard("{ArrowDown}{Enter}");
		expect(onValueChange).toHaveBeenCalledWith("eng");
		expect(input).toHaveValue("Engineer");
	});
});
