"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Loading from "@/app/loading";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
export default function About() {
	const [lang, setLang] = useState(null);
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [data, setData] = useState(null);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLang = localStorage.getItem("lang");
			if (storedLang === "am" || storedLang === "en" || storedLang === "ar") {
				setLang(storedLang);
			} else {
				localStorage.setItem("lang", "en");
				setLang("en");
			}
		}
		if (!lang) return; // Don't fetch until lang is set
		setLoading(true);
		const headers = {
			lang: lang, // Change language dynamically based on state
		};
		// Fetch data from the API with Axios
		axios
			.get(`${API_BASE_URL}/landing/home/services`, { headers: headers })
			.then((response) => {
				setData(response.data.data); // Set the response data to state
				setLoading(false); // Set loading to false
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
		// console.log(data);
	}, [lang]); // Run this effect whenever the `language` changes

	return (
		<div className="about">
			{loading ? (
				<Loading />
			) : (
				<div className="container m-auto" id="services">
					<h2>
						{lang === "en"
							? "Our Services"
							: lang === "am"
							? "አገልግሎቶች"
							: "خدماتنا"}
					</h2>
					<h3>
						{lang === "en"
							? "We offer a wide range of services to meet your needs"
							: lang === "am"
							? "ፍላጎቶችዎን ለማሟላት ሰፋ ያሉ አገልግሎቶችን እናቀርባለን።"
							: "نحن نقدم مجموعة واسعة من الخدمات لتلبية احتياجاتك"}
					</h3>
					<div className="services-conr">
						<Swiper
							slidesPerView={3}
							spaceBetween={32}
							autoplay={true}
							loop={true}
							modules={[Autoplay, Navigation, Pagination]}
							breakpoints={{
								1400: {
									slidesPerView: 3,
								},
								1100: {
									slidesPerView: 3,
								},
								767: {
									slidesPerView: 2.5,
								},
								640: {
									slidesPerView: 1.5,
									autoplay: false,
									spaceBetween: 16,
								},
								100: {
									slidesPerView: 1,
									autoplay: false,
									spaceBetween: 16,
								},
							}}
							className="option"
						>
							{Array.isArray(data) &&
								data.map((item, index) => (
									<SwiperSlide key={index}>
										<Link
											href={`/service?id=${item.id}`}
											className="option"
											key={index}
										>
											<div className="img-cont">
												<Image
													src={item.cover}
													width={200}
													height={200}
													alt="Orient"
												></Image>
											</div>
											<div className="text" dir={lang === "ar" ? "rtl" : ""}>
												<h2>{item.title}</h2>
												<p>{item.description}</p>
												<div className="btn">
													<span>
														{lang === "am"
															? "ተጨማሪ ያንብቡ"
															: lang === "ar"
															? "اقرأ المزيد"
															: "Read More"}{" "}
													</span>{" "}
													<i className={`fa-solid ${lang === "ar" ? "fa-chevron-left" : "fa-chevron-right"}`}></i>
												</div>
											</div>
										</Link>
									</SwiperSlide>
								))}
						</Swiper>
					</div>
				</div>
			)}
		</div>
	);
}
