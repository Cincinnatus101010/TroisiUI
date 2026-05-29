import { describe, expect, it } from "vitest";
import {
	buildCalendarMonth,
	formatDateDisplay,
	isDateWithinBounds,
	parseIsoDate,
	toIsoDate,
} from "./calendar";

describe("calendar", () => {
	it("parses and formats ISO dates", () => {
		expect(parseIsoDate("2026-05-28")?.getDate()).toBe(28);
		expect(formatDateDisplay("2026-05-28")).toMatch(/May/);
		expect(toIsoDate(new Date(2026, 4, 28))).toBe("2026-05-28");
	});

	it("builds a 6-week grid", () => {
		expect(buildCalendarMonth(2026, 4)).toHaveLength(42);
	});

	it("respects min and max bounds", () => {
		expect(isDateWithinBounds("2026-05-10", "2026-05-01", "2026-05-31")).toBe(
			true,
		);
		expect(isDateWithinBounds("2026-06-01", undefined, "2026-05-31")).toBe(
			false,
		);
	});
});
