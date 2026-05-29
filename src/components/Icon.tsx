import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
	size?: IconSize;
	label?: string;
}

export function Icon({
	className,
	size = "md",
	label,
	children,
	...props
}: IconProps) {
	return (
		<span
			className={joinClasses("troisi-icon", `troisi-icon--${size}`, className)}
			role={label ? "img" : undefined}
			aria-hidden={label ? undefined : true}
			{...(label ? { "aria-label": label } : {})}
			{...props}
		>
			{children}
		</span>
	);
}
