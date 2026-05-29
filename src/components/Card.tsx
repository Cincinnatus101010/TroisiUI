import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	description?: string;
}

export function Card({
	className,
	title,
	description,
	children,
	...props
}: CardProps) {
	return (
		<div className={joinClasses("troisi-card", className)} {...props}>
			{(title || description) && (
				<div className="troisi-card__header">
					{title && <h3 className="troisi-card__title">{title}</h3>}
					{description && (
						<p className="troisi-card__description">{description}</p>
					)}
				</div>
			)}
			{children}
		</div>
	);
}
