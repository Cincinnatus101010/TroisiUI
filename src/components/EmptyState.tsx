import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface EmptyStateProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	title: ReactNode;
	description?: ReactNode;
	action?: ReactNode;
}

export function EmptyState({
	className,
	title,
	description,
	action,
	...props
}: EmptyStateProps) {
	return (
		<div className={joinClasses("troisi-empty", className)} {...props}>
			<h3 className="troisi-empty__title">{title}</h3>
			{description && <p className="troisi-empty__desc">{description}</p>}
			{action}
		</div>
	);
}
