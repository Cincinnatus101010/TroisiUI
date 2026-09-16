import type { AnchorHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface NavbarLinkProps
	extends AnchorHTMLAttributes<HTMLAnchorElement> {
	active?: boolean;
}

export function NavbarLink({ className, active, ...props }: NavbarLinkProps) {
	return (
		<a
			className={joinClasses(
				"troisi-navbar__link",
				active && "troisi-navbar__link--active",
				className,
			)}
			{...(active ? { "aria-current": "page" as const } : {})}
			{...props}
		/>
	);
}
