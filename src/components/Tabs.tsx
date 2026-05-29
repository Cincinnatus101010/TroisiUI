"use client";

import {
	createContext,
	type HTMLAttributes,
	type KeyboardEvent,
	useContext,
	useId,
	useState,
} from "react";
import { joinClasses } from "../lib/joinClasses";

interface TabsContextValue {
	active: string;
	setActive: (id: string) => void;
	baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
	const ctx = useContext(TabsContext);
	if (!ctx) throw new Error("Tabs components must be used within Tabs");
	return ctx;
}

type TabsPropsBase = HTMLAttributes<HTMLDivElement> & {
	onValueChange?: (value: string) => void;
};

export type TabsProps = TabsPropsBase &
	(
		| { value: string; defaultValue?: string }
		| { defaultValue: string; value?: string }
	);

export function Tabs({
	className,
	defaultValue,
	value,
	onValueChange,
	children,
	...props
}: TabsProps) {
	const baseId = useId();
	const [internal, setInternal] = useState(defaultValue ?? value ?? "");
	const active = value ?? internal;
	const setActive = (id: string) => {
		setInternal(id);
		onValueChange?.(id);
	};

	return (
		<TabsContext.Provider value={{ active, setActive, baseId }}>
			<div className={joinClasses("troisi-tabs", className)} {...props}>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

export function TabsList({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={joinClasses("troisi-tabs__list", className)}
			role="tablist"
			{...props}
		>
			{children}
		</div>
	);
}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
	value: string;
}

function focusSiblingTab(
	e: KeyboardEvent<HTMLButtonElement>,
	direction: 1 | -1,
) {
	const tabs = Array.from(
		e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
			'[role="tab"]',
		) ?? [],
	);
	const index = tabs.indexOf(e.currentTarget);
	if (index === -1 || tabs.length < 2) return;
	const next = tabs[(index + direction + tabs.length) % tabs.length];
	if (!next) return;
	e.preventDefault();
	next.focus();
	next.click();
}

export function TabsTrigger({
	className,
	value,
	children,
	onKeyDown,
	...props
}: TabsTriggerProps) {
	const { active, setActive, baseId } = useTabsContext();
	const selected = active === value;
	const tabId = `${baseId}-tab-${value}`;
	const panelId = `${baseId}-panel-${value}`;

	return (
		<button
			type="button"
			role="tab"
			id={tabId}
			aria-selected={selected}
			aria-controls={panelId}
			tabIndex={selected ? 0 : -1}
			className={joinClasses(
				"troisi-tabs__trigger",
				selected && "troisi-tabs__trigger--active",
				className,
			)}
			onClick={() => setActive(value)}
			onKeyDown={(e) => {
				if (e.key === "ArrowRight") focusSiblingTab(e, 1);
				else if (e.key === "ArrowLeft") focusSiblingTab(e, -1);
				else if (e.key === "Home") {
					e.preventDefault();
					tabsFirst(e.currentTarget)?.focus();
					tabsFirst(e.currentTarget)?.click();
				} else if (e.key === "End") {
					e.preventDefault();
					tabsLast(e.currentTarget)?.focus();
					tabsLast(e.currentTarget)?.click();
				}
				onKeyDown?.(e);
			}}
			{...props}
		>
			{children}
		</button>
	);
}

function tabsFirst(el: HTMLButtonElement) {
	return (
		el.parentElement?.querySelector<HTMLButtonElement>('[role="tab"]') ?? null
	);
}

function tabsLast(el: HTMLButtonElement) {
	const tabs =
		el.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
	return tabs?.[tabs.length - 1] ?? null;
}

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
}

export function TabsPanel({
	className,
	value,
	children,
	...props
}: TabsPanelProps) {
	const { active, baseId } = useTabsContext();
	const selected = active === value;
	const tabId = `${baseId}-tab-${value}`;
	const panelId = `${baseId}-panel-${value}`;

	return (
		<div
			id={panelId}
			role="tabpanel"
			aria-labelledby={tabId}
			hidden={!selected}
			className={joinClasses(
				"troisi-tabs__panel",
				!selected && "troisi-tabs__panel--hidden",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
