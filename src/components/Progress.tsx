import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ProgressProps extends HTMLAttributes<HTMLProgressElement> {
	value: number;
	max?: number;
}

export function Progress({
	className,
	value,
	max = 100,
	...props
}: ProgressProps) {
	return (
		<progress
			className={joinClasses("troisi-progress", className)}
			value={value}
			max={max}
			{...props}
		/>
	);
}
