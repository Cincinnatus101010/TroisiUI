import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type SkeletonVariant = "text" | "avatar" | "block";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
	variant?: SkeletonVariant;
}

export function Skeleton({
	className,
	variant = "text",
	...props
}: SkeletonProps) {
	return (
		<div
			className={joinClasses(
				"troisi-skeleton",
				`troisi-skeleton--${variant}`,
				className,
			)}
			aria-hidden
			{...props}
		/>
	);
}
