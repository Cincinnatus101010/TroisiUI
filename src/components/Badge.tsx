import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type BadgeVariant = "default" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
}

export function Badge({
	className,
	variant = "default",
	...props
}: BadgeProps) {
	return (
		<span
			className={joinClasses(
				"troisi-badge",
				`troisi-badge--${variant}`,
				className,
			)}
			{...props}
		/>
	);
}
