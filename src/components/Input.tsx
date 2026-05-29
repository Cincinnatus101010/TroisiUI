"use client";

import type { InputHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	invalid?: boolean;
}

export function Input({ className, invalid, ...props }: InputProps) {
	return (
		<input
			className={joinClasses(
				"troisi-input",
				invalid && "troisi-input--invalid",
				className,
			)}
			{...props}
		/>
	);
}
