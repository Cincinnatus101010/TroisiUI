import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
	eyebrow?: ReactNode;
	title: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
	align?: "start" | "center";
}

export function Hero({
	className,
	eyebrow,
	title,
	description,
	actions,
	align = "start",
	children,
	...props
}: HeroProps) {
	return (
		<section
			className={joinClasses(
				"troisi-hero",
				align === "center" && "troisi-hero--center",
				className,
			)}
			{...props}
		>
			{eyebrow && <p className="troisi-hero__eyebrow">{eyebrow}</p>}
			<h1 className="troisi-hero__title">{title}</h1>
			{description && <p className="troisi-hero__description">{description}</p>}
			{actions && <div className="troisi-hero__actions">{actions}</div>}
			{children}
		</section>
	);
}
