"use client";

import type { InputHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ColorInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export function ColorInput({ className, ...props }: ColorInputProps) {
	return (
		<input
			type="color"
			className={joinClasses("troisi-input", "troisi-input--color", className)}
			{...props}
		/>
	);
}
