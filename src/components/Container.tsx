import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
	return (
		<div className={joinClasses("troisi-container", className)} {...props} />
	);
}
