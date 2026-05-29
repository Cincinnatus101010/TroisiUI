export type CalendarCell = {
	iso: string;
	day: number;
	inMonth: boolean;
};

export function parseIsoDate(iso: string): Date | null {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
	const [y, m, d] = iso.split("-").map(Number);
	const date = new Date(y, m - 1, d);
	if (
		date.getFullYear() !== y ||
		date.getMonth() !== m - 1 ||
		date.getDate() !== d
	) {
		return null;
	}
	return date;
}

export function toIsoDate(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

export function formatDateDisplay(iso: string): string {
	const date = parseIsoDate(iso);
	if (!date) return "";
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

export function formatMonthYear(year: number, monthIndex: number): string {
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		year: "numeric",
	}).format(new Date(year, monthIndex, 1));
}

export function isDateWithinBounds(
	iso: string,
	min?: string,
	max?: string,
): boolean {
	if (min && iso < min) return false;
	if (max && iso > max) return false;
	return true;
}

export function buildCalendarMonth(
	year: number,
	monthIndex: number,
): CalendarCell[] {
	const firstOfMonth = new Date(year, monthIndex, 1);
	const start = new Date(year, monthIndex, 1 - firstOfMonth.getDay());
	const cells: CalendarCell[] = [];

	for (let i = 0; i < 42; i++) {
		const date = new Date(start);
		date.setDate(start.getDate() + i);
		cells.push({
			iso: toIsoDate(date),
			day: date.getDate(),
			inMonth: date.getMonth() === monthIndex,
		});
	}

	return cells;
}

export function addMonths(year: number, monthIndex: number, delta: number) {
	const date = new Date(year, monthIndex + delta, 1);
	return { year: date.getFullYear(), monthIndex: date.getMonth() };
}

export const WEEKDAY_LABELS = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa",
] as const;

export function todayIso(): string {
	return toIsoDate(new Date());
}
