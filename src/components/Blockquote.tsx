import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface BlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
	attribution?: ReactNode;
}

export function Blockquote({
	className,
	attribution,
	children,
	...props
}: BlockquoteProps) {
	return (
		<figure className={joinClasses("troisi-blockquote", className)}>
			<blockquote {...props}>{children}</blockquote>
			{attribution && (
				<figcaption className="troisi-blockquote__cite">
					{attribution}
				</figcaption>
			)}
		</figure>
	);
}
