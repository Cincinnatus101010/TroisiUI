import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
	brand?: ReactNode;
	/** Keep inner content within container max-width (default true). Bar spans full width. */
	contained?: boolean;
}

export function Navbar({
	className,
	brand,
	children,
	contained = true,
	...props
}: NavbarProps) {
	return (
		<header className={joinClasses("troisi-navbar", className)} {...props}>
			<div
				className={joinClasses(
					"troisi-navbar__inner",
					contained && "troisi-navbar__inner--contained",
				)}
			>
				{brand && <div className="troisi-navbar__brand">{brand}</div>}
				<nav className="troisi-navbar__nav">{children}</nav>
			</div>
		</header>
	);
}
