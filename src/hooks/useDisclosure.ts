"use client";

import { useCallback, useState } from "react";

export interface UseDisclosureOptions {
	defaultOpen?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
}

export function useDisclosure({
	defaultOpen = false,
	onOpen,
	onClose,
}: UseDisclosureOptions = {}) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const open = useCallback(() => {
		setIsOpen(true);
		onOpen?.();
	}, [onOpen]);

	const close = useCallback(() => {
		setIsOpen(false);
		onClose?.();
	}, [onClose]);

	const toggle = useCallback(() => {
		setIsOpen((prev) => {
			const next = !prev;
			if (next) onOpen?.();
			else onClose?.();
			return next;
		});
	}, [onOpen, onClose]);

	return { isOpen, open, close, toggle, setIsOpen };
}
