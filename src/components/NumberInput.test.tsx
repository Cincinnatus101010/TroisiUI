import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTroisi } from "../test/render";
import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
	it("increments via the stepper button", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();
		renderWithTroisi(
			<NumberInput
				aria-label="Quantity"
				defaultValue={2}
				min={0}
				max={10}
				onValueChange={onValueChange}
			/>,
		);
		await user.click(screen.getByRole("button", { name: "Increase value" }));
		expect(onValueChange).toHaveBeenLastCalledWith(3);
	});

	it("clamps at max when incrementing", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();
		renderWithTroisi(
			<NumberInput
				aria-label="Quantity"
				defaultValue={10}
				min={0}
				max={10}
				onValueChange={onValueChange}
			/>,
		);
		expect(
			screen.getByRole("button", { name: "Increase value" }),
		).toBeDisabled();
		await user.click(screen.getByRole("button", { name: "Decrease value" }));
		expect(onValueChange).toHaveBeenLastCalledWith(9);
	});
});
