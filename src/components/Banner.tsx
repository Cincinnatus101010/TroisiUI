import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type BannerVariant = "info" | "success" | "warning" | "danger";

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
	variant?: BannerVariant;
}

export function Banner({
	className,
	variant = "info",
	children,
	...props
}: BannerProps) {
	return (
		<div
			className={joinClasses(
				"troisi-banner",
				`troisi-banner--${variant}`,
				className,
			)}
			role="status"
			{...props}
		>
			{children}
		</div>
	);
}
