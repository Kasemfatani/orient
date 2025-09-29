"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

export default function CountryCard({ images, text, href }) {
	return (
		<Link
			href={href}
			className="block rounded-2xl overflow-hidden shadow-lg relative group transition-transform duration-200 hover:scale-105"
			style={{ minHeight: 340, height: "40vh" }}
		>
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
							alt={text}
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
				<h2 className="text-white text-3xl md:text-4xl font-bold text-center drop-shadow-lg">
					{text}
				</h2>
			</div>
		</Link>
	);
}
