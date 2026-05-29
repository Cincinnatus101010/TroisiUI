import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface TooltipProps
	extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
	tooltip: ReactNode;
}

export function Tooltip({
	className,
	tooltip,
	children,
	...props
}: TooltipProps) {
	return (
		<span className={joinClasses("troisi-tooltip-wrap", className)} {...props}>
			{children}
			<span className="troisi-tooltip" role="tooltip">
				{tooltip}
			</span>
		</span>
	);
}
