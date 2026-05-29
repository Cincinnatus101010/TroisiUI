"use client";

import type { InputHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface SliderProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {}

export function Slider({ className, ...props }: SliderProps) {
	return (
		<input
			type="range"
			className={joinClasses("troisi-range", className)}
			{...props}
		/>
	);
}
