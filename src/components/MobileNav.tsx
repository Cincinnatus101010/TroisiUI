"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";
import { Button } from "./Button";
import { Drawer } from "./Drawer";

export interface MobileNavProps {
	open: boolean;
	onOpen: () => void;
	onClose: () => void;
	title?: ReactNode;
	children: ReactNode;
	triggerLabel?: string;
	triggerProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;
}

export function MobileNav({
	open,
	onOpen,
	onClose,
	title,
	children,
	triggerLabel = "Menu",
	triggerProps,
}: MobileNavProps) {
	const { className: triggerClassName, ...restTrigger } = triggerProps ?? {};

	return (
		<>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				className={joinClasses("troisi-mobile-nav__trigger", triggerClassName)}
				aria-expanded={open}
				aria-controls="troisi-mobile-nav-panel"
				onClick={onOpen}
				{...restTrigger}
			>
				{triggerLabel}
			</Button>
			<Drawer
				open={open}
				onClose={onClose}
				side="left"
				title={title}
				id="troisi-mobile-nav-panel"
				className="troisi-mobile-nav__drawer"
			>
				<nav className="troisi-mobile-nav" aria-label="Mobile">
					{children}
				</nav>
			</Drawer>
		</>
	);
}
