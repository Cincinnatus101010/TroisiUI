import type { FieldsetHTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface RadioGroupProps
	extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "title"> {
	legend?: ReactNode;
	description?: ReactNode;
}

export function RadioGroup({
	className,
	legend,
	description,
	children,
	...props
}: RadioGroupProps) {
	return (
		<fieldset
			className={joinClasses("troisi-radio-group", className)}
			{...props}
		>
			{legend && (
				<legend className="troisi-radio-group__legend">{legend}</legend>
			)}
			{description && (
				<p className="troisi-radio-group__description">{description}</p>
			)}
			<div className="troisi-radio-group__options">{children}</div>
		</fieldset>
	);
}
