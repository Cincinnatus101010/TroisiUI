import {
	Children,
	cloneElement,
	type HTMLAttributes,
	isValidElement,
	type ReactElement,
} from "react";
import { joinClasses } from "../lib/joinClasses";
import type { AvatarProps } from "./Avatar";

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
	max?: number;
	size?: AvatarProps["size"];
}

export function AvatarGroup({
	className,
	max = 4,
	size,
	children,
	...props
}: AvatarGroupProps) {
	const items = Children.toArray(children).filter(isValidElement);
	const visible = items.slice(0, max);
	const overflow = items.length - visible.length;

	return (
		<div className={joinClasses("troisi-avatar-group", className)} {...props}>
			{visible.map((child, index) => {
				const el = child as ReactElement<AvatarProps>;
				return cloneElement(el, {
					key: el.key ?? index,
					size: el.props.size ?? size,
					className: joinClasses(
						"troisi-avatar-group__item",
						el.props.className,
					),
				});
			})}
			{overflow > 0 && (
				<span
					className={joinClasses(
						"troisi-avatar",
						size && `troisi-avatar--${size}`,
						"troisi-avatar-group__overflow",
					)}
				>
					+{overflow}
				</span>
			)}
		</div>
	);
}
