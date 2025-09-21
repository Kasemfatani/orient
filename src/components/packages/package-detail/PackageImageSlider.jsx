"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Loading from "@/app/loading";

export default function PackageImageSlider({ images = [] }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [isMdUp, setIsMdUp] = useState(false);

	useEffect(() => {
		const checkScreen = () =>
			setIsMdUp(window.matchMedia("(min-width: 768px)").matches);
		checkScreen();
		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, []);

	return (
		<Card className="p-4">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
				{/* Main Swiper */}
				<div className="md:col-span-8 lg:col-span-9">
					<Swiper
						modules={[Navigation, Thumbs]}
						navigation
						thumbs={{
							swiper:
								thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
						}}
						className="rounded-xl"
						style={{ width: "100%", height: 320 }}
					>
						{images.map((img, idx) => (
							<SwiperSlide key={idx}>
								<div className="relative w-full h-[300px]">
									<Image
										src={img}
										alt={`Gallery image ${idx + 1}`}
										fill
										className="object-cover rounded-xl"
										priority={idx === 0}
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* Single Responsive Thumbs Swiper */}
				<div className="md:col-span-4 lg:col-span-3">
					<Swiper
						modules={[Thumbs]}
						onSwiper={setThumbsSwiper}
						direction={isMdUp ? "vertical" : "horizontal"}
						slidesPerView={4}
						spaceBetween={8}
						watchSlidesProgress
						className="rounded-xl"
						style={{
							width: "100%",
							height: isMdUp ? 320 : 80,
						}}
					>
						{images.map((img, idx) => (
							<SwiperSlide key={idx}>
								<div className="relative w-full h-[70px] cursor-pointer border-2 border-transparent hover:border-primary rounded-xl">
									<Image
										src={img}
										alt={`Thumbnail ${idx + 1}`}
										fill
										className="object-cover rounded-xl"
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</Card>
	);
}
