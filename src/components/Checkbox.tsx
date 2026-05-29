"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface CheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: ReactNode;
}

export function Checkbox({ className, label, id, ...props }: CheckboxProps) {
	return (
		<label className={joinClasses("troisi-check", className)} htmlFor={id}>
			<input type="checkbox" id={id} {...props} />
			{label}
		</label>
	);
}
