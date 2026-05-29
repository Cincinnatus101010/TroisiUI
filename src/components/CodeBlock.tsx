import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {}

export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
	return (
		<pre className={joinClasses("troisi-code-block", className)} {...props}>
			<code>{children}</code>
		</pre>
	);
}
