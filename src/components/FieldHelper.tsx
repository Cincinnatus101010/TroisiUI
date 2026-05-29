import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface FieldHelperProps
	extends HTMLAttributes<HTMLParagraphElement> {}

export function FieldHelper({ className, ...props }: FieldHelperProps) {
	return (
		<p className={joinClasses("troisi-field-hint", className)} {...props} />
	);
}
