"use client";

import {
	type ChangeEvent,
	type InputHTMLAttributes,
	type ReactNode,
	useId,
	useState,
} from "react";
import { joinClasses } from "../lib/joinClasses";

export interface FileInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
	buttonLabel?: ReactNode;
	emptyLabel?: string;
}

export function FileInput({
	className,
	id: idProp,
	buttonLabel = "Choose file",
	emptyLabel = "No file selected",
	onChange,
	disabled,
	...props
}: FileInputProps) {
	const uid = useId();
	const id = idProp ?? uid;
	const [fileName, setFileName] = useState<string | null>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFileName(e.target.files?.[0]?.name ?? null);
		onChange?.(e);
	};

	return (
		<div
			className={joinClasses(
				"troisi-file-input",
				disabled && "troisi-file-input--disabled",
				className,
			)}
		>
			<input
				type="file"
				id={id}
				className="troisi-file-input__native"
				disabled={disabled}
				onChange={handleChange}
				{...props}
			/>
			<label htmlFor={id} className="troisi-file-input__surface">
				<span className="troisi-file-input__button">{buttonLabel}</span>
				<span
					className="troisi-file-input__name"
					data-empty={fileName ? undefined : true}
				>
					{fileName ?? emptyLabel}
				</span>
			</label>
		</div>
	);
}
