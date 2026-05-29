import type { HTMLAttributes } from "react";
import { joinClasses } from "../lib/joinClasses";

export type StepStatus = "upcoming" | "active" | "done";

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
	steps: { label: string; status?: StepStatus }[];
}

export function Stepper({ className, steps, ...props }: StepperProps) {
	return (
		<ol className={joinClasses("troisi-stepper", className)} {...props}>
			{steps.map((step) => (
				<li
					key={step.label}
					className={joinClasses(
						"troisi-stepper__step",
						step.status === "active" && "troisi-stepper__step--active",
						step.status === "done" && "troisi-stepper__step--done",
					)}
				>
					<span className="troisi-stepper__dot" aria-hidden />
					<span>{step.label}</span>
				</li>
			))}
		</ol>
	);
}
