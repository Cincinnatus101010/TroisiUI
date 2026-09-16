import type { FieldsetHTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface FieldsetProps
	extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
	legend?: ReactNode;
	description?: ReactNode;
}

export function Fieldset({
	className,
	legend,
	description,
	children,
	...props
}: FieldsetProps) {
	return (
		<fieldset className={joinClasses("troisi-fieldset", className)} {...props}>
			{legend && <legend className="troisi-fieldset__legend">{legend}</legend>}
			{description && (
				<p className="troisi-fieldset__description">{description}</p>
			)}
			{children}
		</fieldset>
	);
}
