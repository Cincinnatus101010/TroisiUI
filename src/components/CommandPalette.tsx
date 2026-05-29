"use client";

import { type HTMLAttributes, useMemo, useState } from "react";
import { Modal } from "./Modal";
import { SearchInput } from "./SearchInput";

export interface CommandItem {
	id: string;
	label: string;
	onSelect?: () => void;
}

export interface CommandPaletteProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	open: boolean;
	onClose: () => void;
	items: CommandItem[];
	title?: string;
}

export function CommandPalette({
	className,
	open,
	onClose,
	items,
	title = "Command palette",
	...props
}: CommandPaletteProps) {
	const [query, setQuery] = useState("");
	const filtered = useMemo(
		() =>
			items.filter((item) =>
				item.label.toLowerCase().includes(query.toLowerCase()),
			),
		[items, query],
	);

	return (
		<Modal
			open={open}
			onClose={onClose}
			title={title}
			className={className}
			{...props}
		>
			<div className="troisi-command">
				<SearchInput
					className="troisi-command__input"
					placeholder="Search commands…"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					autoFocus
				/>
				<div className="troisi-command__list" role="listbox">
					{filtered.map((item) => (
						<button
							key={item.id}
							type="button"
							className="troisi-command__item"
							role="option"
							onClick={() => {
								item.onSelect?.();
								onClose();
							}}
						>
							{item.label}
						</button>
					))}
				</div>
			</div>
		</Modal>
	);
}
