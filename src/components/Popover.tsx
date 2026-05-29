"use client";

import { type HTMLAttributes, type ReactNode, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { joinClasses } from "../lib/joinClasses";
import { mergeTrigger } from "../lib/mergeTrigger";

export interface PopoverProps extends HTMLAttributes<HTMLDivElement> {
	trigger: ReactNode;
}

export function Popover({
	className,
	trigger,
	children,
	...props
}: PopoverProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	useClickOutside(ref, () => setOpen(false), open);
	const toggle = () => setOpen((v) => !v);

	return (
		<div
			ref={ref}
			className={joinClasses("troisi-popover-wrap", className)}
			{...props}
		>
			{mergeTrigger(trigger, {
				open,
				onToggle: toggle,
				haspopup: "dialog",
			})}
			{open && <div className="troisi-popover">{children}</div>}
		</div>
	);
}
