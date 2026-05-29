import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {}

export function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
	return (
		<span
			className={joinClasses("troisi-visually-hidden", className)}
			{...props}
		/>
	);
}
