"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NumberTicker from "../ui/number-ticker";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import BlurFade from "../ui/blur-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function SingleService({ data, lang }) {
	Fancybox.bind("[data-fancybox]", {
		// Your custom options
	});
	//scroll to top
	// useEffect(() => {
	// 	window.scrollTo(0, 0);
	// });
	const [currency, setCurrency] = useState("usd"); // 'usd' or 'sar'
	// const data = {
	//     id: 1,
	//     name: "Umrah Travel",
	//     description: "🌟 Discover Hassle-Free Ummrah Services with Orient 🌟 Embark on a spiritual journey with confidence and peace of mind through our tailored Ummrah packages. At [Your Travel Agency Name], we take pride in providing comprehensive services that cater to all your needs. From visa processing and flight bookings to luxurious accommodation and ground transportation, we ensure every detail is meticulously planned. Experience the convenience of guided tours, spiritual support, and 24/7 customer assistance as you focus on your prayers and spiritual growth. Let us be your trusted companion on this sacred journey, creating unforgettable memories with unmatched comfort and reliability. Contact us today to plan your Ummrah trip and experience excellence in every step! 🕋✈️",
	//     features: [
	//         { title: "Visa Processing", counter: "1000", description: "Visa processing and flight bookings" },
	//         { title: "Accommodation", counter: "500", description: "Luxurious accommodations and ground transportation" },
	//         { title: "Guided Tours", counter: "100", description: "Guided spiritual support and 24/7 customer assistance" },
	//     ],
	//     cover: img1,
	//     images: [
	//         img1, img3, img4, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19
	//     ]
	// }
	// const packages = [
	//     {
	//         title: 'Silver Ummrah Package',
	//         oldPrice: '$ 500',
	//         newPrice: '$ 450',
	//         offer: '10% Off',
	//         details: 'Includes 3-star hotel, flight, and transport.'
	//     },
	//     {
	//         title: 'Gold Ummrah Package',
	//         oldPrice: '$ 680',
	//         newPrice: '$ 620',
	//         offer: 'Limited Offer',
	//         details: 'Includes 4-star hotel, guided tours, meals, and flights.'
	//     },
	//     {
	//         title: 'Platinum Ummrah Package',
	//         oldPrice: '$ 950',
	//         newPrice: '$ 850',
	//         offer: 'Best Value',
	//         details: '5-star hotel, private transport, full board meals & flight.'
	//     },
	// ]
	// console.log(data.packages);
	return (
		<div className="SingleService">
			<div className="container m-auto px-4 md:px-6 lg:px-0">
				<div className="single-details">
					<div className="text flex flex-col md:flex-row gap-6">
						<div className="det w-full">
							<h2 className="text-2xl md:text-3xl lg:text-4xl">
								{data?.title}
							</h2>
							<p className="text-sm md:text-base">{data?.description}</p>
						</div>
						<div className="counters grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
							{data.statistics.map((feature, index) => (
								<div className="counter bg-[#EA9623]" key={index}>
									<h4>{feature.title}</h4>
									<h5>
										<NumberTicker value={Number(feature.counter)} /> +{" "}
									</h5>
									<p>{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="packages mt-8 md:mt-10">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-xl md:text-2xl font-bold">Packages</h3>
						<div className="flex gap-2">
							<button
								className={`px-3 py-1 rounded ${
									currency === "usd"
										? "bg-yellow-500 text-black"
										: "bg-white border"
								}`}
								onClick={() => setCurrency("usd")}
							>
								Dollar ($)
							</button>
							<button
								className={`px-3 py-1 rounded ${
									currency === "sar"
										? "bg-yellow-500 text-black"
										: "bg-white border"
								}`}
								onClick={() => setCurrency("sar")}
							>
								Saudi Riyal (
								<span
									style={{
										verticalAlign: "middle",
										display: "inline-block",
										width: "1.2em",
										height: "1em",
									}}
								>
									<svg
										viewBox="0 0 1124.14 1256.39"
										width="1em"
										height="1em"
										fill="currentColor"
									>
										<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
										<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
									</svg>
								</span>
								)
							</button>
						</div>
					</div>
					<Swiper
						modules={[Pagination, Autoplay]}
						spaceBetween={15}
						slidesPerView={1}
						pagination={{ clickable: true }}
						autoplay={{ delay: 3000 }}
						className="swiperPackages"
						breakpoints={{
							0: {
								slidesPerView: 1,
								spaceBetween: 10,
							},
							640: {
								slidesPerView: 1.5,
								spaceBetween: 15,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 20,
							},
						}}
					>
						{data.packages.map((pkg, index) => (
							<SwiperSlide key={index}>
								<Link
									href="contact"
									className="package-card !h-[34rem] flex flex-col justify-between"
								>
									{/* Add package cover image */}
									{pkg.cover && (
										<div className="package-img mb-3 h-60 flex items-center justify-center relative">
											{/* Discount badge */}
											{(currency === "usd" && pkg.precetage_discount) ||
											(currency === "sar" && pkg.precetage_discount_sar) ? (
												<span className="absolute top-2 left-2 bg-green-700 text-white px-3 py-1 rounded-md font-bold text-sm z-10 shadow-md">
													{currency === "usd"
														? `${pkg.precetage_discount} % Off`
														: `${pkg.precetage_discount_sar} % Off`}
												</span>
											) : null}
											<Image
												src={pkg.cover}
												alt={pkg.title}
												width={200}
												height={120}
												className="w-full h-60 rounded-lg object-cover"
											/>
										</div>
									)}
									<h4>{pkg.title}</h4>
									<div className="price-section">
										<p
											className="new-price"
											style={{ fontWeight: "bold", color: "#2e8b57" }}
										>
											{currency === "usd" ? (
												`$${pkg.discount_price}`
											) : pkg.discount_price_sar ? (
												<span
													style={{
														verticalAlign: "middle",
														display: "inline-flex",
														alignItems: "center",
														gap: "0.2em",
													}}
												>
													<svg
														viewBox="0 0 1124.14 1256.39"
														width="1em"
														height="1em"
														style={{
															marginRight: "0.1em",
														}}
													>
														<path
															d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z"
															fill="rgb(46, 139, 87)"
														/>
														<path
															d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z"
															fill="rgb(46, 139, 87)"
														/>
													</svg>
													{pkg.discount_price_sar}
												</span>
											) : (
												`$${pkg.discount_price}`
											)}
										</p>
										<p
											className="old-price"
											style={{ textDecoration: "line-through", color: "#999" }}
										>
											{currency === "usd" ? (
												`$${pkg.original_price}`
											) : pkg.original_price_sar ? (
												<span
													style={{
														verticalAlign: "middle",
														display: "inline-flex",
														alignItems: "center",
														gap: "0.2em",
														textDecoration: "line-through",
													}}
												>
													<svg
														viewBox="0 0 1124.14 1256.39"
														width="1em"
														height="1em"
														style={{
															marginRight: "0.1em",
														}}
														fill="gray"
													>
														<path d="M699.62,1113.02h0c-20.06,44.48-33.32,92.75-38.4,143.37l424.51-90.24c20.06-44.47,33.31-92.75,38.4-143.37l-424.51,90.24Z" />
														<path d="M1085.73,895.8c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.33v-135.2l292.27-62.11c20.06-44.47,33.32-92.75,38.4-143.37l-330.68,70.27V66.13c-50.67,28.45-95.67,66.32-132.25,110.99v403.35l-132.25,28.11V0c-50.67,28.44-95.67,66.32-132.25,110.99v525.69l-295.91,62.88c-20.06,44.47-33.33,92.75-38.42,143.37l334.33-71.05v170.26l-358.3,76.14c-20.06,44.47-33.32,92.75-38.4,143.37l375.04-79.7c30.53-6.35,56.77-24.4,73.83-49.24l68.78-101.97v-.02c7.14-10.55,11.3-23.27,11.3-36.97v-149.98l132.25-28.11v270.4l424.53-90.28Z" />
													</svg>
													{pkg.original_price_sar}
												</span>
											) : (
												`$${pkg.original_price}`
											)}
										</p>
									</div>
									{/* <span className="offer">
										{currency === "usd"
											? `${pkg.precetage_discount} % Off`
											: pkg.precetage_discount_sar
											? `${pkg.precetage_discount_sar} % Off`
											: `${pkg.precetage_discount} % Off`}
									</span> */}
									<p className="details">{pkg.description}</p>
									<button
										type="button"
										className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition"
									>
										{lang === "en" ? "Contact Us" : "አግኙን"}
									</button>
								</Link>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className="gallery mt-8 md:mt-10">
					<h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
						{lang === "en" ? "Gallery" : "ጋለሪ"}
					</h3>
					<div className="columns-1 xs:columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 md:gap-4">
						{data.images.map((img, idx) => (
							<BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
								<a href={img} data-fancybox="gallery">
									<figure className="mb-3 md:mb-4">
										<Image
											src={img}
											alt="Orient"
											width={240}
											height={180}
											className="w-[240px] h-[180px] object-cover rounded-lg mx-auto"
										/>
									</figure>
								</a>
							</BlurFade>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
