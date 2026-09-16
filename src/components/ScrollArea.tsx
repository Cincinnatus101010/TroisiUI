import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {}

export function ScrollArea({ className, ...props }: ScrollAreaProps) {
	return (
		<div className={joinClasses("troisi-scroll-area", className)} {...props} />
	);
}
