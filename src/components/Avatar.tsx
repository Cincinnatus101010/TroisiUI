import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
	src?: string;
	alt?: string;
	initials?: string;
	size?: AvatarSize;
}

export function Avatar({
	className,
	src,
	alt = "",
	initials,
	size = "md",
	...props
}: AvatarProps) {
	return (
		<span
			className={joinClasses(
				"troisi-avatar",
				`troisi-avatar--${size}`,
				className,
			)}
			{...props}
		>
			{src ? <img src={src} alt={alt} /> : (initials ?? "?")}
		</span>
	);
}
