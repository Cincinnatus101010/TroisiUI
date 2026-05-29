/** Join class names; filters falsy values. No Tailwind merge. */
export function joinClasses(
	...parts: (string | false | null | undefined)[]
): string {
	return parts.filter(Boolean).join(" ");
}
