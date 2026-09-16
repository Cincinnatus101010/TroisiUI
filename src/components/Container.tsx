import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	/** When false, removes horizontal padding (max-width centering remains). */
	padding?: boolean;
}

export function Container({
	className,
	padding = true,
	...props
}: ContainerProps) {
	return (
		<div
			className={joinClasses(
				"troisi-container",
				!padding && "troisi-container--flush",
				className,
			)}
			{...props}
		/>
	);
}
