import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";
import { FieldError } from "./FieldError";
import { FieldHelper } from "./FieldHelper";
import { Label } from "./Label";

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
	label?: string;
	htmlFor?: string;
	required?: boolean;
	helper?: ReactNode;
	error?: ReactNode;
}

export function FormField({
	className,
	label,
	htmlFor,
	required,
	helper,
	error,
	children,
	...props
}: FormFieldProps) {
	return (
		<div className={joinClasses("troisi-field", className)} {...props}>
			{label && (
				<Label htmlFor={htmlFor} required={required}>
					{label}
				</Label>
			)}
			{children}
			{helper && <FieldHelper>{helper}</FieldHelper>}
			{error && <FieldError>{error}</FieldError>}
		</div>
	);
}
