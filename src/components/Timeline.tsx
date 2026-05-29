import type { HTMLAttributes, LiHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {}

export function Timeline({ className, ...props }: TimelineProps) {
	return (
		<ol className={joinClasses("troisi-timeline", className)} {...props} />
	);
}

export interface TimelineItemProps extends LiHTMLAttributes<HTMLLIElement> {}

export function TimelineItem({
	className,
	children,
	...props
}: TimelineItemProps) {
	return (
		<li className={joinClasses("troisi-timeline__item", className)} {...props}>
			<span className="troisi-timeline__dot" aria-hidden />
			<div>{children}</div>
		</li>
	);
}
