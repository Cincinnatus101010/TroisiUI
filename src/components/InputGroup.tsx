import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
	leading?: ReactNode;
	trailing?: ReactNode;
}

export function InputGroup({
	className,
	leading,
	trailing,
	children,
	...props
}: InputGroupProps) {
	return (
		<div
			className={joinClasses(
				"troisi-input-group",
				Boolean(leading) && "troisi-input-group--has-leading",
				Boolean(trailing) && "troisi-input-group--has-trailing",
				className,
			)}
			{...props}
		>
			{leading && (
				<span className="troisi-input-group__addon troisi-input-group__addon--leading">
					{leading}
				</span>
			)}
			{children}
			{trailing && (
				<span className="troisi-input-group__addon troisi-input-group__addon--trailing">
					{trailing}
				</span>
			)}
		</div>
	);
}
