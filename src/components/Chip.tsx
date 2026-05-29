"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
	onDismiss?: () => void;
	children: ReactNode;
}

export function Chip({ className, onDismiss, children, ...props }: ChipProps) {
	return (
		<span className={joinClasses("troisi-chip", className)} {...props}>
			{children}
			{onDismiss && (
				<button
					type="button"
					className="troisi-chip__dismiss"
					aria-label="Remove"
					onClick={onDismiss}
				>
					×
				</button>
			)}
		</span>
	);
}
