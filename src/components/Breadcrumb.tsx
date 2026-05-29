import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {}

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
	return (
		<nav aria-label="Breadcrumb" className={joinClasses(className)} {...props}>
			<ol className="troisi-breadcrumb">{children}</ol>
		</nav>
	);
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
	separator?: ReactNode;
}

export function BreadcrumbItem({
	className,
	separator = "/",
	children,
	...props
}: BreadcrumbItemProps) {
	return (
		<li className={joinClasses(className)} {...props}>
			{children}
			{separator && (
				<span className="troisi-breadcrumb__sep" aria-hidden>
					{separator}
				</span>
			)}
		</li>
	);
}
