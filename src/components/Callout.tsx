import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export type CalloutVariant = "info" | "success" | "warning" | "danger";

export interface CalloutProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	variant?: CalloutVariant;
	title?: ReactNode;
}

export function Callout({
	className,
	variant = "info",
	title,
	children,
	...props
}: CalloutProps) {
	return (
		<aside
			className={joinClasses(
				"troisi-callout",
				`troisi-callout--${variant}`,
				className,
			)}
			{...props}
		>
			{title && <p className="troisi-callout__title">{title}</p>}
			{children && <div className="troisi-callout__body">{children}</div>}
		</aside>
	);
}
