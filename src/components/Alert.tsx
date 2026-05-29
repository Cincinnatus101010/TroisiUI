import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	variant?: AlertVariant;
	heading?: ReactNode;
}

export function Alert({
	className,
	variant = "info",
	heading,
	children,
	...props
}: AlertProps) {
	return (
		<div
			className={joinClasses(
				"troisi-alert",
				`troisi-alert--${variant}`,
				className,
			)}
			role="alert"
			{...props}
		>
			<span className="troisi-alert__icon" aria-hidden />
			<div className="troisi-alert__content">
				{heading ? <p className="troisi-alert__heading">{heading}</p> : null}
				{children ? <div className="troisi-alert__body">{children}</div> : null}
			</div>
		</div>
	);
}
