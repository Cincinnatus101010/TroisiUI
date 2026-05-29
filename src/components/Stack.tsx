import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type StackDirection = "column" | "row";
export type StackGap = 1 | 2 | 3 | 4 | 6 | 8;

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
	direction?: StackDirection;
	gap?: StackGap;
	align?: "start" | "center" | "stretch";
}

export function Stack({
	className,
	direction = "column",
	gap = 4,
	align,
	...props
}: StackProps) {
	return (
		<div
			className={joinClasses(
				"troisi-stack",
				direction === "row" && "troisi-stack--row",
				`troisi-stack--gap-${gap}`,
				align === "center" && "troisi-stack--align-center",
				className,
			)}
			{...props}
		/>
	);
}
