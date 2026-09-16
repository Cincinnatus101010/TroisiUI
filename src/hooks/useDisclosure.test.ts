import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
	it("opens, closes, and toggles", () => {
		const onOpen = vi.fn();
		const onClose = vi.fn();
		const { result } = renderHook(() => useDisclosure({ onOpen, onClose }));

		expect(result.current.isOpen).toBe(false);

		act(() => result.current.open());
		expect(result.current.isOpen).toBe(true);
		expect(onOpen).toHaveBeenCalledTimes(1);

		act(() => result.current.close());
		expect(result.current.isOpen).toBe(false);
		expect(onClose).toHaveBeenCalledTimes(1);

		act(() => result.current.toggle());
		expect(result.current.isOpen).toBe(true);
	});
});
