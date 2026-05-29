import type { ElementType, HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type TextVariant =
	| "display"
	| "h1"
	| "h2"
	| "h3"
	| "body"
	| "small"
	| "caption"
	| "code";

export type TextTone = "default" | "muted" | "subtle";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
	variant?: TextVariant;
	tone?: TextTone;
	as?: "p" | "span" | "h1" | "h2" | "h3" | "div" | "code";
}

const defaultElement: Record<TextVariant, ElementType> = {
	display: "h1",
	h1: "h1",
	h2: "h2",
	h3: "h3",
	body: "p",
	small: "p",
	caption: "span",
	code: "code",
};

export function Typography({
	variant = "body",
	tone = "default",
	as,
	className,
	children,
	...props
}: TypographyProps) {
	const Component: ElementType = as ?? defaultElement[variant];
	return (
		<Component
			className={joinClasses(
				"troisi-text",
				variant === "code" ? "troisi-text--code" : `troisi-text--${variant}`,
				tone !== "default" && `troisi-text--${tone}`,
				className,
			)}
			{...props}
		>
			{children}
		</Component>
	);
}
