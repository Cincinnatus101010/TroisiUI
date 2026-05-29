"use client";

import { type HTMLAttributes, useRef } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { joinClasses } from "../lib/joinClasses";

export interface FocusTrapProps extends HTMLAttributes<HTMLDivElement> {
	enabled?: boolean;
}

export function FocusTrap({
	className,
	enabled = true,
	children,
	...props
}: FocusTrapProps) {
	const ref = useRef<HTMLDivElement>(null);
	useFocusTrap(ref, enabled);
	return (
		<div ref={ref} className={joinClasses(className)} {...props}>
			{children}
		</div>
	);
}
