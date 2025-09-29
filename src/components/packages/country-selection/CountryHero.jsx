"use client";

import Image from "next/image";
import React from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

export default function CountryHero({ data }) {
	const { images, text } = data;

	return (
		<div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
			{/* Swiper images (z-0 by default) */}
			<Swiper
				slidesPerView={1}
				loop={true}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				effect="fade"
				modules={[Autoplay, EffectFade]}
				className="w-full h-full"
			>
				{images.map((src, idx) => (
					<SwiperSlide key={idx}>
						<Image
							src={src}
							alt=""
							fill
							className="object-cover w-full h-full"
							priority={idx === 0}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			{/* Black overlay */}
			<div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />
			{/* Centered text */}
			<div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
				<h1 className="text-white text-4xl md:text-5xl font-bold text-center drop-shadow-lg">
					{text}
				</h1>
			</div>
		</div>
	);
}
