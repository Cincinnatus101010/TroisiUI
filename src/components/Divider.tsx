import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {}

export function Divider({ className, ...props }: DividerProps) {
	return <hr className={joinClasses("troisi-divider", className)} {...props} />;
}
