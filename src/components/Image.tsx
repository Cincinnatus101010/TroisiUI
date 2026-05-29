import type { ImgHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	cover?: boolean;
	alt: string;
}

export function Image({ className, cover, alt, ...props }: ImageProps) {
	return (
		<img
			alt={alt}
			className={joinClasses(
				"troisi-image",
				cover && "troisi-image--cover",
				className,
			)}
			{...props}
		/>
	);
}
