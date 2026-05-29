import type { HTMLAttributes, ThHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface TableProps extends HTMLAttributes<HTMLTableElement> {}

export function Table({ className, ...props }: TableProps) {
	return (
		<div className="troisi-table-wrap">
			<table className={joinClasses("troisi-table", className)} {...props} />
		</div>
	);
}

export interface TableSortHeaderProps
	extends ThHTMLAttributes<HTMLTableCellElement> {
	sortDirection?: "asc" | "desc" | null;
	onSort?: () => void;
}

export function TableSortHeader({
	className,
	sortDirection,
	onSort,
	children,
	...props
}: TableSortHeaderProps) {
	return (
		<th className={className} {...props}>
			<button type="button" className="troisi-table__sort" onClick={onSort}>
				{children}
				{sortDirection === "asc" && " ↑"}
				{sortDirection === "desc" && " ↓"}
			</button>
		</th>
	);
}
