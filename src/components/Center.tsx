import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
	inline?: boolean;
}

export function Center({ className, inline, ...props }: CenterProps) {
	return (
		<div
			className={joinClasses(
				inline ? "troisi-center--inline" : "troisi-center",
				className,
			)}
			{...props}
		/>
	);
}
