import type { HTMLAttributes, ReactNode } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface DescriptionListProps
	extends HTMLAttributes<HTMLDListElement> {}

export function DescriptionList({ className, ...props }: DescriptionListProps) {
	return (
		<dl
			className={joinClasses("troisi-description-list", className)}
			{...props}
		/>
	);
}

export interface DescriptionTermProps extends HTMLAttributes<HTMLElement> {}

export function DescriptionTerm({ className, ...props }: DescriptionTermProps) {
	return (
		<dt
			className={joinClasses("troisi-description-list__term", className)}
			{...props}
		/>
	);
}

export interface DescriptionDetailsProps extends HTMLAttributes<HTMLElement> {}

export function DescriptionDetails({
	className,
	...props
}: DescriptionDetailsProps) {
	return (
		<dd
			className={joinClasses("troisi-description-list__details", className)}
			{...props}
		/>
	);
}

/** Single row variant for stacked term + details pairs. */
export interface DescriptionItemProps extends HTMLAttributes<HTMLDivElement> {
	term: ReactNode;
}

export function DescriptionItem({
	className,
	term,
	children,
	...props
}: DescriptionItemProps) {
	return (
		<div
			className={joinClasses("troisi-description-list__item", className)}
			{...props}
		>
			<DescriptionTerm>{term}</DescriptionTerm>
			<DescriptionDetails>{children}</DescriptionDetails>
		</div>
	);
}
