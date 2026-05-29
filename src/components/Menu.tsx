"use client";

import { type HTMLAttributes, type ReactNode, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { joinClasses } from "../lib/joinClasses";
import { mergeTrigger } from "../lib/mergeTrigger";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
	trigger: ReactNode;
}

export function Menu({ className, trigger, children, ...props }: MenuProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, () => setOpen(false), open);
	const toggle = () => setOpen((v) => !v);

	return (
		<div ref={ref} className={joinClasses("troisi-menu", className)} {...props}>
			{mergeTrigger(trigger, {
				open,
				onToggle: toggle,
				haspopup: "menu",
				fallbackClassName: "troisi-menu__trigger",
			})}
			{open && <div className="troisi-menu__panel">{children}</div>}
		</div>
	);
}

export interface MenuItemProps extends HTMLAttributes<HTMLButtonElement> {}

export function MenuItem({ className, ...props }: MenuItemProps) {
	return (
		<button
			type="button"
			className={joinClasses("troisi-menu__item", className)}
			{...props}
		/>
	);
}
