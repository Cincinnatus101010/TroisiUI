import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
	/** Pin to top of a scroll container / section. */
	sticky?: boolean;
}

export function Toolbar({
	className,
	sticky,
	children,
	...props
}: ToolbarProps) {
	return (
		<div
			className={joinClasses(
				"troisi-toolbar",
				sticky && "troisi-toolbar--sticky",
				className,
			)}
			role="toolbar"
			{...props}
		>
			{children}
		</div>
	);
}
