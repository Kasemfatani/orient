"use client";
import Loading from "@/app/loading";
import { API_BASE_URL } from "@/lib/apiConfig";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function Hero() {
	const [muted, setMuted] = useState(true);
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [data, setData] = useState(null);
	const [lang, setLang] = useState("en");
	useEffect(() => {
		if (typeof window !== "undefined") {
			if (
				localStorage.getItem("lang") === "am" ||
				localStorage.getItem("lang") === "en"
			) {
				setLang(localStorage.getItem("lang"));
			} else {
				localStorage.setItem("lang", "en");
				setLang("en");
			}
		}
		setLoading(true);
		const headers = {
			lang: lang, // Change language dynamically based on state
		};
		// Fetch data from the API with Axios
		axios
			.get(`${API_BASE_URL}/landing/home/sliders`, { headers: headers })
			.then((response) => {
				setData(response.data.data); // Set the response data to state
				setLoading(false); // Set loading to false
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
	}, [lang]); // Run this effect whenever the `language` changes

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Swiper
					slidesPerView={1}
					spaceBetween={0}
					autoplay={false}
					navigation={true}
					pagination={true}
					loop={true}
					modules={[Autoplay, Navigation, Pagination]}
					breakpoints={{
						1400: {
							slidesPerView: 1,
						},
					}}
					className="hero-swiper"
				>
					{Array.isArray(data) &&
						data.map((item, index) => (
							<SwiperSlide key={index}>
								<div className="hero">
									{item.type == "image" ? (
										<Image
											src={item.file}
											width={1920}
											height={1080}
											alt={"Orient"}
											className="hero-img"
										/>
									) : (
										<video width="320" height="240" autoPlay loop muted={muted}>
											<source src={item.file} type="video/mp4" />
											<source src={item.file} type="video/ogg" />
											Your browser does not support the video tag.
										</video>
									)}
									<div className="overlay">
										<div className="container m-auto">
											{item.type == "image" ? (
												<div className="heading">
													<h1>{item.title}</h1>
												</div>
											) : null}
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			)}
		</>
	);
}
