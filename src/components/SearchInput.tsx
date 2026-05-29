"use client";

import type { InputHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface SearchInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export function SearchInput({ className, ...props }: SearchInputProps) {
	return (
		<input
			type="search"
			className={joinClasses("troisi-input", "troisi-input--search", className)}
			{...props}
		/>
	);
}
