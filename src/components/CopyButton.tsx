"use client";

import type { ButtonHTMLAttributes } from "react";
import { useState } from "react";
import { joinClasses } from "../lib/joinClasses";
import { Button } from "./Button";

export interface CopyButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
	value: string;
	copiedLabel?: string;
	label?: string;
}

export function CopyButton({
	className,
	value,
	label = "Copy",
	copiedLabel = "Copied",
	...props
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard denied */
		}
	};

	return (
		<Button
			type="button"
			variant="secondary"
			size="sm"
			className={joinClasses("troisi-copy-button", className)}
			onClick={() => void copy()}
			{...props}
		>
			{copied ? copiedLabel : label}
		</Button>
	);
}
