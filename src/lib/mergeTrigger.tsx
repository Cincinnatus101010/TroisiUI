import {
	cloneElement,
	isValidElement,
	type MouseEvent,
	type ReactElement,
	type ReactNode,
} from "react";

type TriggerProps = {
	onClick?: (e: MouseEvent<HTMLElement>) => void;
	className?: string;
	"aria-expanded"?: boolean;
	"aria-haspopup"?: boolean | "menu" | "dialog";
};

/** Use the trigger element directly when it is already interactive (e.g. Button). */
export function mergeTrigger(
	trigger: ReactNode,
	opts: {
		open: boolean;
		onToggle: () => void;
		haspopup: "menu" | "dialog" | true;
		fallbackClassName?: string;
	},
): ReactNode {
	if (isValidElement(trigger)) {
		const el = trigger as ReactElement<TriggerProps>;
		return cloneElement(el, {
			onClick: (e: MouseEvent<HTMLElement>) => {
				el.props.onClick?.(e);
				opts.onToggle();
			},
			"aria-expanded": opts.open,
			"aria-haspopup": opts.haspopup,
		});
	}

	return (
		<button
			type="button"
			className={opts.fallbackClassName}
			onClick={opts.onToggle}
			aria-expanded={opts.open}
			aria-haspopup={opts.haspopup}
		>
			{trigger}
		</button>
	);
}
