import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	HTMLAttributes,
	ReactNode,
} from "react";
import { joinClasses } from "../lib/joinClasses";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
	return (
		<aside className={joinClasses("troisi-sidebar", className)} {...props} />
	);
}

type SidebarItemBase = {
	active?: boolean;
	className?: string;
	children?: ReactNode;
};

export type SidebarItemProps = SidebarItemBase &
	(
		| ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
		| ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
	);

export function SidebarItem({
	className,
	active,
	href,
	children,
	...props
}: SidebarItemProps) {
	const cls = joinClasses(
		"troisi-sidebar__item",
		active && "troisi-sidebar__item--active",
		className,
	);

	if (href !== undefined) {
		const anchorProps = props as Omit<
			AnchorHTMLAttributes<HTMLAnchorElement>,
			"href"
		>;
		return (
			<a href={href} className={cls} {...anchorProps}>
				{children}
			</a>
		);
	}

	const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
	return (
		<button type="button" className={cls} {...buttonProps}>
			{children}
		</button>
	);
}
