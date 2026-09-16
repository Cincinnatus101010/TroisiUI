"use client";

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
	const [stored, setStored] = useState<T>(initialValue);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(key);
			if (raw !== null) setStored(JSON.parse(raw) as T);
		} catch {
			/* SSR / private mode */
		}
	}, [key]);

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			setStored((prev) => {
				const next =
					typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
				try {
					localStorage.setItem(key, JSON.stringify(next));
				} catch {
					/* quota / private mode */
				}
				return next;
			});
		},
		[key],
	);

	return [stored, setValue];
}
