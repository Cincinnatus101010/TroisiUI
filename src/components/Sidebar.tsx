import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	HTMLAttributes,
	ReactNode,
} from "react";
import { joinClasses } from "../lib/joinClasses";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
	/** Narrow rail width for icon-only sidebars. */
	collapsed?: boolean;
}

export function Sidebar({ className, collapsed, ...props }: SidebarProps) {
	return (
		<aside
			className={joinClasses(
				"troisi-sidebar",
				collapsed && "troisi-sidebar--collapsed",
				className,
			)}
			{...props}
		/>
	);
}

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
	return (
		<div
			className={joinClasses("troisi-sidebar__header", className)}
			{...props}
		/>
	);
}

export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
	return (
		<div
			className={joinClasses("troisi-sidebar__content", className)}
			{...props}
		/>
	);
}

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
	return (
		<div
			className={joinClasses("troisi-sidebar__footer", className)}
			{...props}
		/>
	);
}

export interface SidebarSectionProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	title?: ReactNode;
}

export function SidebarSection({
	className,
	title,
	children,
	...props
}: SidebarSectionProps) {
	return (
		<div
			className={joinClasses("troisi-sidebar__section", className)}
			{...props}
		>
			{title && <p className="troisi-sidebar__section-title">{title}</p>}
			{children}
		</div>
	);
}

type SidebarItemBase = {
	active?: boolean;
	className?: string;
	children?: ReactNode;
	disabled?: boolean;
	icon?: ReactNode;
};

export type SidebarItemProps = SidebarItemBase &
	(
		| ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
		| ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
	);

function SidebarItemContent({
	icon,
	children,
}: Pick<SidebarItemBase, "icon" | "children">) {
	return (
		<>
			{icon && <span className="troisi-sidebar__item-icon">{icon}</span>}
			<span className="troisi-sidebar__item-label">{children}</span>
		</>
	);
}

export function SidebarItem({
	className,
	active,
	disabled,
	icon,
	href,
	children,
	...props
}: SidebarItemProps) {
	const cls = joinClasses(
		"troisi-sidebar__item",
		active && "troisi-sidebar__item--active",
		disabled && "troisi-sidebar__item--disabled",
		className,
	);

	if (href !== undefined) {
		const anchorProps = props as Omit<
			AnchorHTMLAttributes<HTMLAnchorElement>,
			"href"
		>;
		if (disabled) {
			return (
				<span className={cls} aria-disabled="true">
					<SidebarItemContent icon={icon}>{children}</SidebarItemContent>
				</span>
			);
		}
		return (
			<a href={href} className={cls} {...anchorProps}>
				<SidebarItemContent icon={icon}>{children}</SidebarItemContent>
			</a>
		);
	}

	const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
	return (
		<button type="button" className={cls} disabled={disabled} {...buttonProps}>
			<SidebarItemContent icon={icon}>{children}</SidebarItemContent>
		</button>
	);
}
