"use client";

import type { InputHTMLAttributes } from "react";
import { useCallback, useState } from "react";
import { joinClasses } from "../lib/joinClasses";
import { Button } from "./Button";
import { Input } from "./Input";

export interface NumberInputProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"type" | "value" | "defaultValue" | "onChange"
	> {
	value?: number;
	defaultValue?: number;
	onValueChange?: (value: number | undefined) => void;
	min?: number;
	max?: number;
	step?: number;
}

function clamp(n: number, min?: number, max?: number) {
	let v = n;
	if (min !== undefined) v = Math.max(min, v);
	if (max !== undefined) v = Math.min(max, v);
	return v;
}

export function NumberInput({
	className,
	value,
	defaultValue,
	onValueChange,
	min,
	max,
	step = 1,
	disabled,
	id,
	...props
}: NumberInputProps) {
	const [uncontrolled, setUncontrolled] = useState<number | undefined>(
		defaultValue,
	);
	const current = value ?? uncontrolled;

	const commit = useCallback(
		(next: number | undefined) => {
			if (next !== undefined && Number.isFinite(next)) {
				next = clamp(next, min, max);
			}
			if (value === undefined) setUncontrolled(next);
			onValueChange?.(next);
		},
		[max, min, onValueChange, value],
	);

	const bump = (delta: number) => {
		const base = current ?? 0;
		commit(clamp(base + delta, min, max));
	};

	return (
		<div
			className={joinClasses("troisi-number-input", className)}
			data-disabled={disabled ? "" : undefined}
		>
			<Button
				type="button"
				variant="secondary"
				size="sm"
				className="troisi-number-input__btn"
				disabled={disabled || (min !== undefined && (current ?? 0) <= min)}
				aria-label="Decrease value"
				onClick={() => bump(-step)}
			>
				−
			</Button>
			<Input
				id={id}
				type="number"
				className="troisi-number-input__field"
				value={current ?? ""}
				disabled={disabled}
				min={min}
				max={max}
				step={step}
				onChange={(e) => {
					const raw = e.target.value;
					if (raw === "") {
						commit(undefined);
						return;
					}
					const parsed = Number.parseFloat(raw);
					if (!Number.isNaN(parsed)) commit(parsed);
				}}
				{...props}
			/>
			<Button
				type="button"
				variant="secondary"
				size="sm"
				className="troisi-number-input__btn"
				disabled={disabled || (max !== undefined && (current ?? 0) >= max)}
				aria-label="Increase value"
				onClick={() => bump(step)}
			>
				+
			</Button>
		</div>
	);
}
