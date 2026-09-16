"use client";

import { type KeyboardEvent, useId, useMemo, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { joinClasses } from "../lib/joinClasses";
import { Input } from "./Input";

export interface ComboboxOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface ComboboxProps {
	options: ComboboxOption[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	id?: string;
	name?: string;
	disabled?: boolean;
	invalid?: boolean;
	className?: string;
	emptyMessage?: string;
	"aria-label"?: string;
	"aria-labelledby"?: string;
}

function labelFor(options: ComboboxOption[], value: string | undefined) {
	return options.find((o) => o.value === value)?.label ?? "";
}

export function Combobox({
	options,
	value: valueProp,
	defaultValue,
	onValueChange,
	placeholder = "Select…",
	id,
	name,
	disabled,
	invalid,
	className,
	emptyMessage = "No matches",
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledby,
}: ComboboxProps) {
	const listboxId = useId();
	const autoId = useId();
	const inputId = id ?? autoId;
	const wrapRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [filtering, setFiltering] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "");
	const selected = valueProp ?? uncontrolled;

	useClickOutside(
		wrapRef,
		() => {
			setOpen(false);
			setFiltering(false);
			setQuery("");
			setActiveIndex(-1);
		},
		open,
	);

	const filtered = useMemo(() => {
		if (!filtering || !query.trim()) return options;
		const q = query.toLowerCase();
		return options.filter((o) => o.label.toLowerCase().includes(q));
	}, [options, filtering, query]);

	const display = open && filtering ? query : labelFor(options, selected);

	const commit = (option: ComboboxOption) => {
		if (option.disabled) return;
		if (valueProp === undefined) setUncontrolled(option.value);
		onValueChange?.(option.value);
		setOpen(false);
		setFiltering(false);
		setQuery("");
		setActiveIndex(-1);
	};

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return;
		if (event.key === "ArrowDown") {
			event.preventDefault();
			if (!open) {
				setOpen(true);
				setActiveIndex(0);
				return;
			}
			setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
			return;
		}
		if (event.key === "ArrowUp") {
			event.preventDefault();
			if (!open) {
				setOpen(true);
				setActiveIndex(filtered.length - 1);
				return;
			}
			setActiveIndex((i) => Math.max(i - 1, 0));
			return;
		}
		if (event.key === "Enter" && open) {
			event.preventDefault();
			const option = filtered[Math.max(activeIndex, 0)];
			if (option) commit(option);
			return;
		}
		if (event.key === "Escape") {
			event.preventDefault();
			setOpen(false);
			setFiltering(false);
			setQuery("");
			setActiveIndex(-1);
		}
	};

	return (
		<div ref={wrapRef} className={joinClasses("troisi-combobox", className)}>
			<Input
				id={inputId}
				name={name}
				role="combobox"
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledby}
				aria-autocomplete="list"
				aria-expanded={open}
				aria-controls={listboxId}
				aria-activedescendant={
					open && activeIndex >= 0
						? `${listboxId}-opt-${filtered[activeIndex]?.value ?? ""}`
						: undefined
				}
				placeholder={placeholder}
				disabled={disabled}
				invalid={invalid}
				autoComplete="off"
				value={display}
				onChange={(event) => {
					setFiltering(true);
					setQuery(event.target.value);
					setOpen(true);
					setActiveIndex(-1);
				}}
				onFocus={() => {
					if (disabled) return;
					setOpen(true);
				}}
				onKeyDown={onKeyDown}
			/>
			{open ? (
				<div className="troisi-combobox__list" id={listboxId} role="listbox">
					{filtered.length === 0 ? (
						<div className="troisi-combobox__empty">{emptyMessage}</div>
					) : (
						filtered.map((option, index) => (
							<button
								key={option.value}
								type="button"
								id={`${listboxId}-opt-${option.value}`}
								role="option"
								aria-selected={option.value === selected}
								disabled={option.disabled}
								className={joinClasses(
									"troisi-combobox__option",
									index === activeIndex && "troisi-combobox__option--active",
									option.value === selected &&
										"troisi-combobox__option--selected",
								)}
								onMouseEnter={() => setActiveIndex(index)}
								onMouseDown={(event) => {
									event.preventDefault();
									commit(option);
								}}
							>
								{option.label}
							</button>
						))
					)}
				</div>
			) : null}
		</div>
	);
}
