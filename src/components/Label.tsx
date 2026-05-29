import type { LabelHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	required?: boolean;
}

export function Label({ className, required, ...props }: LabelProps) {
	return (
		<label
			className={joinClasses(
				"troisi-label",
				required && "troisi-label--required",
				className,
			)}
			{...props}
		/>
	);
}
