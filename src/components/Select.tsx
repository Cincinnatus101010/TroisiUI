"use client";

import type { SelectHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	invalid?: boolean;
}

export function Select({ className, invalid, ...props }: SelectProps) {
	return (
		<select
			className={joinClasses(
				"troisi-select",
				invalid && "troisi-input--invalid",
				className,
			)}
			{...props}
		/>
	);
}
