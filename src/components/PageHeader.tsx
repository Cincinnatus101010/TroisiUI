import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface PageHeaderProps
	extends Omit<HTMLAttributes<HTMLElement>, "title"> {
	title: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
}

export function PageHeader({
	className,
	title,
	description,
	actions,
	...props
}: PageHeaderProps) {
	return (
		<header className={joinClasses("troisi-page-header", className)} {...props}>
			<div className="troisi-page-header__text">
				<h1 className="troisi-page-header__title">{title}</h1>
				{description && (
					<p className="troisi-page-header__description">{description}</p>
				)}
			</div>
			{actions && <div className="troisi-page-header__actions">{actions}</div>}
		</header>
	);
}
