import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {}

export function FieldError({ className, ...props }: FieldErrorProps) {
	return (
		<p
			className={joinClasses("troisi-field-error", className)}
			role="alert"
			{...props}
		/>
	);
}
