"use client";

import {
	type ChangeEvent,
	type InputHTMLAttributes,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import {
	addMonths,
	buildCalendarMonth,
	formatDateDisplay,
	formatMonthYear,
	isDateWithinBounds,
	parseIsoDate,
	todayIso,
	WEEKDAY_LABELS,
} from "../lib/calendar";
import { joinClasses } from "../lib/joinClasses";

export interface DateInputProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"type" | "value" | "defaultValue" | "onChange"
	> {
	mode?: "date" | "time" | "datetime-local";
	value?: string;
	defaultValue?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

function CalendarIcon() {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			aria-hidden="true"
		>
			<rect x="2" y="3" width="12" height="11" rx="1.5" />
			<path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" strokeLinecap="round" />
		</svg>
	);
}

function emitChange(
	onChange: DateInputProps["onChange"],
	value: string,
	name?: string,
) {
	onChange?.({
		target: { value, name: name ?? "" },
	} as ChangeEvent<HTMLInputElement>);
}

export function DateInput({
	className,
	mode = "date",
	value: controlledValue,
	defaultValue,
	onChange,
	disabled,
	id: idProp,
	placeholder = "Select date",
	min,
	max,
	name,
	...props
}: DateInputProps) {
	const uid = useId();
	const id = idProp ?? uid;
	const calendarId = `${id}-calendar`;
	const wrapRef = useRef<HTMLDivElement>(null);

	const [open, setOpen] = useState(false);
	const [internalValue, setInternalValue] = useState(defaultValue ?? "");
	const value = controlledValue ?? internalValue;

	const parsed = value ? parseIsoDate(value) : null;
	const initialView = parsed ?? new Date();
	const [viewYear, setViewYear] = useState(initialView.getFullYear());
	const [viewMonth, setViewMonth] = useState(initialView.getMonth());

	useClickOutside(wrapRef, () => setOpen(false), open);

	useEffect(() => {
		if (!value) return;
		const date = parseIsoDate(value);
		if (!date) return;
		setViewYear(date.getFullYear());
		setViewMonth(date.getMonth());
	}, [value]);

	const setValue = useCallback(
		(next: string) => {
			if (controlledValue === undefined) setInternalValue(next);
			emitChange(onChange, next, name);
		},
		[controlledValue, onChange, name],
	);

	const selectDate = (iso: string) => {
		if (
			!isDateWithinBounds(
				iso,
				min as string | undefined,
				max as string | undefined,
			)
		) {
			return;
		}
		setValue(iso);
		setOpen(false);
	};

	const shiftMonth = (delta: number) => {
		const next = addMonths(viewYear, viewMonth, delta);
		setViewYear(next.year);
		setViewMonth(next.monthIndex);
	};

	if (mode !== "date") {
		return (
			<input
				type={mode}
				id={id}
				name={name}
				className={joinClasses("troisi-input", className)}
				value={controlledValue}
				defaultValue={defaultValue}
				onChange={onChange}
				disabled={disabled}
				min={min}
				max={max}
				{...props}
			/>
		);
	}

	const cells = buildCalendarMonth(viewYear, viewMonth);
	const today = todayIso();
	const minStr = typeof min === "string" ? min : undefined;
	const maxStr = typeof max === "string" ? max : undefined;

	return (
		<div
			ref={wrapRef}
			className={joinClasses(
				"troisi-date-input",
				open && "troisi-date-input--open",
				disabled && "troisi-date-input--disabled",
				className,
			)}
		>
			<div className="troisi-date-input__control">
				<input
					{...props}
					id={id}
					name={name}
					type="text"
					readOnly
					disabled={disabled}
					placeholder={placeholder}
					value={value ? formatDateDisplay(value) : ""}
					className="troisi-input troisi-date-input__field"
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-controls={open ? calendarId : undefined}
					onClick={() => !disabled && setOpen((o) => !o)}
					onKeyDown={(e) => {
						if (disabled) return;
						if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							setOpen(true);
						}
						if (e.key === "Escape") setOpen(false);
					}}
				/>
				<button
					type="button"
					className="troisi-date-input__trigger"
					disabled={disabled}
					aria-label="Open calendar"
					aria-expanded={open}
					aria-controls={open ? calendarId : undefined}
					onClick={() => setOpen((o) => !o)}
				>
					<CalendarIcon />
				</button>
			</div>

			{open ? (
				<div
					id={calendarId}
					className="troisi-date-input__calendar"
					role="dialog"
					aria-label="Choose date"
				>
					<div className="troisi-date-input__header">
						<button
							type="button"
							className="troisi-date-input__nav"
							aria-label="Previous month"
							onClick={() => shiftMonth(-1)}
						>
							‹
						</button>
						<span className="troisi-date-input__month">
							{formatMonthYear(viewYear, viewMonth)}
						</span>
						<button
							type="button"
							className="troisi-date-input__nav"
							aria-label="Next month"
							onClick={() => shiftMonth(1)}
						>
							›
						</button>
					</div>

					<div className="troisi-date-input__weekdays">
						{WEEKDAY_LABELS.map((label) => (
							<span key={label} className="troisi-date-input__weekday">
								{label}
							</span>
						))}
					</div>

					<div className="troisi-date-input__grid" role="grid">
						{cells.map((cell) => {
							const selectable = isDateWithinBounds(cell.iso, minStr, maxStr);
							const isSelected = value === cell.iso;
							const isToday = cell.iso === today;

							return (
								<button
									key={cell.iso}
									type="button"
									role="gridcell"
									disabled={!selectable}
									className={joinClasses(
										"troisi-date-input__day",
										!cell.inMonth && "troisi-date-input__day--outside",
										isSelected && "troisi-date-input__day--selected",
										isToday && "troisi-date-input__day--today",
									)}
									aria-label={formatDateDisplay(cell.iso)}
									aria-selected={isSelected}
									onClick={() => selectDate(cell.iso)}
								>
									{cell.day}
								</button>
							);
						})}
					</div>

					<div className="troisi-date-input__footer">
						<button
							type="button"
							className="troisi-date-input__footer-btn"
							onClick={() => selectDate(today)}
						>
							Today
						</button>
						{value ? (
							<button
								type="button"
								className="troisi-date-input__footer-btn"
								onClick={() => {
									setValue("");
									setOpen(false);
								}}
							>
								Clear
							</button>
						) : null}
					</div>
				</div>
			) : null}
		</div>
	);
}
