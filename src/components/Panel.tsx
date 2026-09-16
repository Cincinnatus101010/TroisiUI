import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface PanelProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	title?: ReactNode;
	description?: ReactNode;
	footer?: ReactNode;
	padding?: 0 | 4 | 6;
}

export function Panel({
	className,
	title,
	description,
	footer,
	padding = 6,
	children,
	...props
}: PanelProps) {
	return (
		<div
			className={joinClasses(
				"troisi-panel",
				padding === 0 && "troisi-panel--p-0",
				padding === 4 && "troisi-panel--p-4",
				padding === 6 && "troisi-panel--p-6",
				className,
			)}
			{...props}
		>
			{(title || description) && (
				<header className="troisi-panel__header">
					{title && <h3 className="troisi-panel__title">{title}</h3>}
					{description && (
						<p className="troisi-panel__description">{description}</p>
					)}
				</header>
			)}
			<div className="troisi-panel__body">{children}</div>
			{footer && <footer className="troisi-panel__footer">{footer}</footer>}
		</div>
	);
}
