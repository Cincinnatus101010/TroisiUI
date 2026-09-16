import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface KbdProps extends HTMLAttributes<HTMLElement> {}

export function Kbd({ className, ...props }: KbdProps) {
	return <kbd className={joinClasses("troisi-kbd", className)} {...props} />;
}
