import type { VideoHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {}

export function Video({ className, ...props }: VideoProps) {
	return (
		<video className={joinClasses("troisi-video", className)} {...props} />
	);
}
