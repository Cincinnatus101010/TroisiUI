import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
	padding?: 0 | 2 | 4 | 6;
	rounded?: boolean;
	bordered?: boolean;
	elevated?: boolean;
}

export function Box({
	className,
	padding,
	rounded,
	bordered,
	elevated,
	...props
}: BoxProps) {
	return (
		<div
			className={joinClasses(
				"troisi-box",
				padding !== undefined && `troisi-box--p-${padding}`,
				rounded && "troisi-box--rounded",
				bordered && "troisi-box--bordered",
				elevated && "troisi-box--elevated",
				className,
			)}
			{...props}
		/>
	);
}
