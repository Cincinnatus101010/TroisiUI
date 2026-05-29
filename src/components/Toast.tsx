"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { Portal } from "./Portal";

export interface ToastMessage {
	id: string;
	message: ReactNode;
}

interface ToastContextValue {
	toast: (message: ReactNode) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<ToastMessage[]>([]);

	const toast = useCallback((message: ReactNode) => {
		const id = crypto.randomUUID();
		setItems((prev) => [...prev, { id, message }]);
		setTimeout(() => {
			setItems((prev) => prev.filter((t) => t.id !== id));
		}, 4000);
	}, []);

	const value = useMemo(() => ({ toast }), [toast]);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<Portal>
				<div className="troisi-toast-region" aria-live="polite">
					{items.map((item) => (
						<div key={item.id} className="troisi-toast">
							{item.message}
						</div>
					))}
				</div>
			</Portal>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
}
