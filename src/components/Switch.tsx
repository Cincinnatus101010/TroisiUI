"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface SwitchProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	label?: ReactNode;
}

export function Switch({
	className,
	label,
	id,
	checked,
	defaultChecked,
	...props
}: SwitchProps) {
	const isChecked = Boolean(checked ?? defaultChecked);
	return (
		<label className={joinClasses("troisi-switch", className)} htmlFor={id}>
			<input
				type="checkbox"
				role="switch"
				aria-checked={isChecked}
				id={id}
				checked={checked}
				defaultChecked={defaultChecked}
				{...props}
			/>
			<span className="troisi-switch__track" aria-hidden />
			{label}
		</label>
	);
}
