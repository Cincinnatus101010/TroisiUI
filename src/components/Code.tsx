import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface CodeProps extends HTMLAttributes<HTMLElement> {}

export function Code({ className, ...props }: CodeProps) {
	return (
		<code className={joinClasses("troisi-text--code", className)} {...props} />
	);
}
