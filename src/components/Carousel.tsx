"use client";

import { type HTMLAttributes, type ReactNode, useRef } from "react";
import { joinClasses } from "../lib/joinClasses";
import { Button } from "./Button";

export interface CarouselSlide {
	id: string;
	content: ReactNode;
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
	slides: CarouselSlide[];
}

export function Carousel({ className, slides, ...props }: CarouselProps) {
	const trackRef = useRef<HTMLDivElement>(null);

	const scroll = (dir: -1 | 1) => {
		const track = trackRef.current;
		if (!track) return;
		const width = track.clientWidth * 0.8;
		track.scrollBy({ left: dir * width, behavior: "smooth" });
	};

	return (
		<div className={joinClasses("troisi-carousel", className)} {...props}>
			<div ref={trackRef} className="troisi-carousel__track">
				{slides.map((slide) => (
					<div key={slide.id} className="troisi-carousel__slide">
						{slide.content}
					</div>
				))}
			</div>
			<div className="troisi-carousel__controls">
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={() => scroll(-1)}
				>
					Prev
				</Button>
				<Button
					type="button"
					variant="secondary"
					size="sm"
					onClick={() => scroll(1)}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
