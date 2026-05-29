"use client";

import { type RefObject, useEffect } from "react";

const FOCUSABLE =
	'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export function useFocusTrap<T extends HTMLElement>(
	ref: RefObject<T | null>,
	enabled = true,
) {
	useEffect(() => {
		if (!enabled || !ref.current) return;
		const root = ref.current;
		const focusables = () =>
			Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
				(el) => !el.hasAttribute("disabled"),
			);

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key !== "Tab") return;
			const nodes = focusables();
			if (nodes.length === 0) return;
			const first = nodes[0];
			const last = nodes[nodes.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		root.addEventListener("keydown", onKeyDown);
		focusables()[0]?.focus();
		return () => root.removeEventListener("keydown", onKeyDown);
	}, [ref, enabled]);
}
