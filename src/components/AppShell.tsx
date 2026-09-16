import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";
import { Container } from "./Container";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
	navbar?: ReactNode;
	sidebar?: ReactNode;
	/** Apply container gutters to main content (default true). */
	contained?: boolean;
}

export function AppShell({
	className,
	navbar,
	sidebar,
	contained = true,
	children,
	...props
}: AppShellProps) {
	const main = contained ? (
		<Container className="troisi-app-shell__container">{children}</Container>
	) : (
		<div className="troisi-app-shell__container">{children}</div>
	);

	return (
		<div className={joinClasses("troisi-app-shell", className)} {...props}>
			{navbar}
			<div className="troisi-app-shell__body">
				{sidebar}
				<main className="troisi-app-shell__main">{main}</main>
			</div>
		</div>
	);
}
