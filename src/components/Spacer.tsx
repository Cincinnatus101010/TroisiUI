import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
	size?: "flex" | 4 | 8 | 16;
}

export function Spacer({ className, size = "flex", ...props }: SpacerProps) {
	return (
		<div
			className={joinClasses(
				"troisi-spacer",
				size !== "flex" && `troisi-spacer--fixed-${size}`,
				className,
			)}
			aria-hidden
			{...props}
		/>
	);
}
