import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type GridCols = 1 | 2 | 3 | 4 | 6 | 12;
export type GridGap = 2 | 4 | 6 | 8;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
	cols?: GridCols;
	gap?: GridGap;
}

export function Grid({ className, cols = 1, gap = 4, ...props }: GridProps) {
	return (
		<div
			className={joinClasses(
				"troisi-grid",
				`troisi-grid--cols-${cols}`,
				gap !== 4 && `troisi-grid--gap-${gap}`,
				className,
			)}
			{...props}
		/>
	);
}
