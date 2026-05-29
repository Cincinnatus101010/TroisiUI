"use client";

import type { ImgHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";
import { Portal } from "./Portal";

export interface LightboxProps extends ImgHTMLAttributes<HTMLImageElement> {
	open: boolean;
	onClose: () => void;
}

export function Lightbox({
	className,
	open,
	onClose,
	alt = "",
	...props
}: LightboxProps) {
	if (!open) return null;

	return (
		<Portal>
			<div
				className={joinClasses("troisi-lightbox", className)}
				role="dialog"
				aria-modal="true"
			>
				<button
					type="button"
					className="troisi-lightbox__close"
					onClick={onClose}
					aria-label="Close"
				>
					×
				</button>
				<img className="troisi-lightbox__img" alt={alt} {...props} />
			</div>
		</Portal>
	);
}
