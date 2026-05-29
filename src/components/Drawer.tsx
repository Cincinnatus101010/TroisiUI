"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";
import { FocusTrap } from "./FocusTrap";
import { Portal } from "./Portal";

export interface DrawerProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	open: boolean;
	onClose: () => void;
	side?: "left" | "right";
	title?: ReactNode;
}

export function Drawer({
	className,
	open,
	onClose,
	side = "right",
	title,
	children,
	...props
}: DrawerProps) {
	if (!open) return null;

	return (
		<Portal>
			<div className="troisi-overlay">
				<button
					type="button"
					className="troisi-overlay__backdrop"
					aria-label="Close drawer"
					onClick={onClose}
				/>
				<FocusTrap>
					<div
						className={joinClasses(
							"troisi-drawer",
							side === "left" && "troisi-drawer--left",
							className,
						)}
						role="dialog"
						aria-modal="true"
						{...props}
					>
						{title && <h2 className="troisi-modal__title">{title}</h2>}
						{children}
					</div>
				</FocusTrap>
			</div>
		</Portal>
	);
}
