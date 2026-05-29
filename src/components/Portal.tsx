"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
	children: ReactNode;
	container?: Element | null;
}

export function Portal({ children, container }: PortalProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	const target = container ?? document.body;
	return createPortal(children, target);
}
