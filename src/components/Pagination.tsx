"use client";

import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	className,
	page,
	totalPages,
	onPageChange,
	...props
}: PaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	return (
		<nav
			className={joinClasses("troisi-pagination", className)}
			aria-label="Pagination"
			{...props}
		>
			<button
				type="button"
				className="troisi-pagination__btn"
				disabled={page <= 1}
				onClick={() => onPageChange(page - 1)}
			>
				Prev
			</button>
			{pages.map((p) => (
				<button
					key={p}
					type="button"
					className={joinClasses(
						"troisi-pagination__btn",
						p === page && "troisi-pagination__btn--active",
					)}
					onClick={() => onPageChange(p)}
					aria-current={p === page ? "page" : undefined}
				>
					{p}
				</button>
			))}
			<button
				type="button"
				className="troisi-pagination__btn"
				disabled={page >= totalPages}
				onClick={() => onPageChange(page + 1)}
			>
				Next
			</button>
		</nav>
	);
}
