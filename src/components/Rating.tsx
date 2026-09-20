"use client";

import { useCallback, useState } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface RatingProps {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	max?: number;
	readOnly?: boolean;
	className?: string;
	name?: string;
	"aria-label"?: string;
}

export function Rating({
	value,
	defaultValue = 0,
	onChange,
	max = 5,
	readOnly = false,
	className,
	name,
	"aria-label": ariaLabel = "Rating",
}: RatingProps) {
	const [uncontrolled, setUncontrolled] = useState(defaultValue);
	const [hover, setHover] = useState(0);
	const current = value ?? uncontrolled;

	const setValue = useCallback(
		(next: number) => {
			if (readOnly) return;
			if (value === undefined) setUncontrolled(next);
			onChange?.(next);
		},
		[onChange, readOnly, value],
	);

	return (
		<div
			className={joinClasses(
				"troisi-rating",
				readOnly && "troisi-rating--readonly",
				className,
			)}
			role="radiogroup"
			aria-label={ariaLabel}
			onMouseLeave={() => setHover(0)}
		>
			{Array.from({ length: max }, (_, index) => {
				const star = index + 1;
				const filled = star <= (hover || current);
				return (
					<button
						key={star}
						type="button"
						name={name}
						className={joinClasses(
							"troisi-rating__star",
							filled && "troisi-rating__star--filled",
						)}
						role="radio"
						aria-checked={star === current}
						disabled={readOnly}
						onMouseEnter={() => !readOnly && setHover(star)}
						onClick={() => setValue(star)}
					>
						<span aria-hidden>★</span>
					</button>
				);
			})}
		</div>
	);
}
