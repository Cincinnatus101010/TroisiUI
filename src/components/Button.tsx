"use client";

import type { ButtonHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
}

export function Button({
	className,
	variant = "primary",
	size = "md",
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={joinClasses(
				"troisi-button",
				variant === "icon"
					? "troisi-button--icon"
					: `troisi-button--${variant}`,
				variant !== "icon" && `troisi-button--${size}`,
				variant === "icon" && `troisi-button--${size}`,
				className,
			)}
			{...props}
		/>
	);
}
