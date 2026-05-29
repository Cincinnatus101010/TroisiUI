import type { AnchorHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type LinkVariant = "default" | "subtle";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	variant?: LinkVariant;
}

export function Link({ className, variant = "default", ...props }: LinkProps) {
	return (
		<a
			className={joinClasses(
				"troisi-link",
				variant === "subtle" && "troisi-link--subtle",
				className,
			)}
			{...props}
		/>
	);
}
