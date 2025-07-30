"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ServiceTop from "@/components/service/ServiceTop";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import Loading from "../loading";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function Advant() {
	const searchparams = useSearchParams();
	const pathId = searchparams.get("id");
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [data, setData] = useState(null);
	const [lang, setLang] = useState("en");
	// Fancybox binding
	useEffect(() => {
		Fancybox.bind("[data-fancybox]", {});
		return () => Fancybox.unbind("[data-fancybox]");
	}, []);
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
		setLoading(true);
		const headers = {
			lang: lang, // Change language dynamically based on state
		};
		// Fetch data from the API with Axios
		axios
			.get(`${API_BASE_URL}/landing/home/blogs/${pathId}`, { headers: headers })
			.then((response) => {
				setData(response.data.data); // Set the response data to state
				setLoading(false); // Set loading to false
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
	}, [lang]); // Run this effect whenever the `language` changes

	// console.log(data);
	return (
		<div className="blogs-main-page" dir={lang === "ar" ? "rtl" : ""}>
			{loading ? (
				<Loading />
			) : (
				<>
					{data?.cover && (
						<ServiceTop img={data.cover} title={data?.title} lang={lang} />
					)}
					<div className="container changed-container m-auto">
						<div className="plan-main plan-main-details">
							<div className="l-side">
								<div className="title-price">
									<div className="title">
										<h4>{data?.title}</h4>
										{/* <div className="stars-reviews-cont">
											<div className="stars">
												{Array.from({ length: 5 }).map((_, index) => (
													<i
														className={`fa-star ${
															data?.rating > index ? "fa-solid" : "fa-regular"
														}`}
														key={index}
													></i>
												))}
											</div>
											<span>(2.3k review)</span>
										</div> */}
									</div>
								</div>
								<p
									className={`discripton ${lang === "ar" ? "text-right" : ""}`}
								>
									{" "}
									{data?.description}{" "}
								</p>
								<h3>
									{lang === "en"
										? "From our gallery"
										: lang === "am"
										? "ከጋለሪያችን"
										: "من معرض الصور"}
								</h3>
								<div className="imgs-cont">
									{Array.isArray(data?.images) &&
										data.images.map((item, index) => (
											<a
												data-fancybox="gallery"
												href={item}
												className="img-cont"
												key={index}
											>
												<Image
													src={item}
													alt="Saudi-Arabia"
													data-caption="Caption #1"
													width={100}
													height={100}
												/>
											</a>
										))}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
