import type { FormHTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export function Form({ className, ...props }: FormProps) {
	return <form className={joinClasses("troisi-form", className)} {...props} />;
}
