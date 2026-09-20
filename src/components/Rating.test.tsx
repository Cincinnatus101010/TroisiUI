import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithTroisi } from "../test/render";
import { Rating } from "./Rating";

describe("Rating", () => {
	it("fires onChange when a star is clicked", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		renderWithTroisi(
			<Rating aria-label="Quality" defaultValue={1} onChange={onChange} />,
		);
		const stars = screen.getAllByRole("radio");
		await user.click(stars[2]);
		expect(onChange).toHaveBeenCalledWith(3);
	});

	it("does not call onChange when readOnly", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		renderWithTroisi(
			<Rating
				aria-label="Quality"
				readOnly
				defaultValue={2}
				onChange={onChange}
			/>,
		);
		await user.click(screen.getAllByRole("radio")[4]);
		expect(onChange).not.toHaveBeenCalled();
	});
});
