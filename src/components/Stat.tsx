import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
	label: ReactNode;
	value: ReactNode;
}

export function Stat({ className, label, value, ...props }: StatProps) {
	return (
		<div className={joinClasses("troisi-stat", className)} {...props}>
			<span className="troisi-stat__label">{label}</span>
			<span className="troisi-stat__value">{value}</span>
		</div>
	);
}
