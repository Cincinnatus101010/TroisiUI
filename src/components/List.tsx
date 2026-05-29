import type { HTMLAttributes, LiHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {}

export function List({ className, ...props }: ListProps) {
	return <ul className={joinClasses("troisi-list", className)} {...props} />;
}

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {}

export function ListItem({ className, ...props }: ListItemProps) {
	return (
		<li className={joinClasses("troisi-list__item", className)} {...props} />
	);
}
