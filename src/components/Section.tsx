import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface SectionProps
	extends Omit<HTMLAttributes<HTMLElement>, "title"> {
	title?: ReactNode;
	description?: ReactNode;
}

export function Section({
	className,
	title,
	description,
	children,
	...props
}: SectionProps) {
	return (
		<section className={joinClasses("troisi-section", className)} {...props}>
			{(title || description) && (
				<header className="troisi-section__header">
					{title && <h2 className="troisi-section__title">{title}</h2>}
					{description && (
						<p className="troisi-section__description">{description}</p>
					)}
				</header>
			)}
			{children}
		</section>
	);
}
