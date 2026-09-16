import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";
import { Container } from "./Container";

export interface FooterProps extends HTMLAttributes<HTMLElement> {
	contained?: boolean;
	brand?: ReactNode;
}

export function Footer({
	className,
	contained = true,
	brand,
	children,
	...props
}: FooterProps) {
	const inner = (
		<>
			{brand && <div className="troisi-footer__brand">{brand}</div>}
			<div className="troisi-footer__content">{children}</div>
		</>
	);

	return (
		<footer className={joinClasses("troisi-footer", className)} {...props}>
			{contained ? (
				<Container className="troisi-footer__inner">{inner}</Container>
			) : (
				<div className="troisi-footer__inner">{inner}</div>
			)}
		</footer>
	);
}
