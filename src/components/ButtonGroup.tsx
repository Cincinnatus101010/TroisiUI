import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
	/** Stack buttons vertically on narrow viewports. */
	attached?: boolean;
}

export function ButtonGroup({
	className,
	attached = true,
	children,
	...props
}: ButtonGroupProps) {
	return (
		<div
			className={joinClasses(
				"troisi-button-group",
				attached && "troisi-button-group--attached",
				className,
			)}
			role="group"
			{...props}
		>
			{children}
		</div>
	);
}
