"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";
import { FocusTrap } from "./FocusTrap";
import { Portal } from "./Portal";

export interface ModalProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	open: boolean;
	onClose: () => void;
	title?: ReactNode;
	footer?: ReactNode;
}

export function Modal({
	className,
	open,
	onClose,
	title,
	footer,
	children,
	...props
}: ModalProps) {
	if (!open) return null;

	return (
		<Portal>
			<div className="troisi-overlay">
				<button
					type="button"
					className="troisi-overlay__backdrop"
					aria-label="Close dialog"
					onClick={onClose}
				/>
				<FocusTrap>
					<div
						className={joinClasses("troisi-modal", className)}
						role="dialog"
						aria-modal="true"
						aria-labelledby={title ? "troisi-modal-title" : undefined}
						{...props}
					>
						{title && (
							<div className="troisi-modal__header">
								<h2 id="troisi-modal-title" className="troisi-modal__title">
									{title}
								</h2>
							</div>
						)}
						{children}
						{footer && <div className="troisi-modal__footer">{footer}</div>}
					</div>
				</FocusTrap>
			</div>
		</Portal>
	);
}
