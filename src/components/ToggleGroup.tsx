"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ToggleGroupOption {
	value: string;
	label: ReactNode;
	disabled?: boolean;
}

export interface ToggleGroupProps {
	options: ToggleGroupOption[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	name?: string;
	className?: string;
	"aria-label"?: string;
}

export function ToggleGroup({
	options,
	value,
	defaultValue,
	onValueChange,
	name,
	className,
	"aria-label": ariaLabel,
}: ToggleGroupProps) {
	const autoId = useId();
	const isControlled = value !== undefined;
	const groupName = name ?? autoId;

	return (
		<div
			className={joinClasses("troisi-toggle-group", className)}
			role="radiogroup"
			aria-label={ariaLabel}
		>
			{options.map((option) => {
				const checked = isControlled
					? value === option.value
					: defaultValue === option.value;
				return (
					<label
						key={option.value}
						className={joinClasses(
							"troisi-toggle-group__item",
							checked && "troisi-toggle-group__item--checked",
							option.disabled && "troisi-toggle-group__item--disabled",
						)}
					>
						<input
							type="radio"
							className="troisi-toggle-group__input"
							name={groupName}
							value={option.value}
							checked={isControlled ? checked : undefined}
							defaultChecked={!isControlled ? checked : undefined}
							disabled={option.disabled}
							onChange={() => onValueChange?.(option.value)}
						/>
						<span className="troisi-toggle-group__label">{option.label}</span>
					</label>
				);
			})}
		</div>
	);
}
