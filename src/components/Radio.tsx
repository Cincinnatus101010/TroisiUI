"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface RadioProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: ReactNode;
}

export function Radio({ className, label, id, ...props }: RadioProps) {
	return (
		<label className={joinClasses("troisi-radio", className)} htmlFor={id}>
			<input type="radio" id={id} {...props} />
			{label}
		</label>
	);
}
