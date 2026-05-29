import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";
import { VisuallyHidden } from "./VisuallyHidden";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
	size?: "md" | "lg";
	label?: string;
}

export function Spinner({
	className,
	size = "md",
	label = "Loading",
	...props
}: SpinnerProps) {
	return (
		<span
			className={joinClasses(
				"troisi-spinner",
				size === "lg" && "troisi-spinner--lg",
				className,
			)}
			role="status"
			{...props}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
		</span>
	);
}
