"use client";

import { type HTMLAttributes, type ReactNode, useState } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface AccordionItem {
	id: string;
	title: string;
	content: ReactNode;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
	items: AccordionItem[];
	allowMultiple?: boolean;
}

export function Accordion({
	className,
	items,
	allowMultiple = false,
	...props
}: AccordionProps) {
	const [open, setOpen] = useState<Set<string>>(new Set());

	const toggle = (id: string) => {
		setOpen((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				if (!allowMultiple) next.clear();
				next.add(id);
			}
			return next;
		});
	};

	return (
		<div className={joinClasses("troisi-accordion", className)} {...props}>
			{items.map((item) => (
				<div key={item.id} className="troisi-accordion__item">
					<button
						type="button"
						className="troisi-accordion__trigger"
						aria-expanded={open.has(item.id)}
						onClick={() => toggle(item.id)}
					>
						{item.title}
						<span aria-hidden>{open.has(item.id) ? "−" : "+"}</span>
					</button>
					{open.has(item.id) && (
						<div className="troisi-accordion__panel">{item.content}</div>
					)}
				</div>
			))}
		</div>
	);
}
