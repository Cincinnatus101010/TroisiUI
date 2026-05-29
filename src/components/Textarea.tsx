"use client";

import type { TextareaHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	invalid?: boolean;
}

export function Textarea({ className, invalid, ...props }: TextareaProps) {
	return (
		<textarea
			className={joinClasses(
				"troisi-textarea",
				invalid && "troisi-input--invalid",
				className,
			)}
			{...props}
		/>
	);
}
