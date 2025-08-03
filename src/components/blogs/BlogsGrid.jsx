"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import Loading from "@/app/loading";

export default function BlogsGrid() {
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [data, setData] = useState(null);
	const [lang, setLang] = useState(null); // Start as null
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
		// console.log("Fetched data in useEffect blosg grid. the lang is :", lang);
		if (!lang) return; // Don't fetch until lang is set
		setLoading(true);
		const headers = {
			lang: lang, // Change language dynamically based on state
		};
		// Fetch data from the API with Axios
		axios
			.get(`${API_BASE_URL}/landing/home/blogs`, { headers: headers })
			.then((response) => {
				setData(response.data.data); // Set the response data to state
				setLoading(false); // Set loading to false
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
	}, [lang]); // Run this effect whenever the `language` changes
// console.log("after useEffect blosg grid. the data is :", data , lang);
	return (
		<div className="news brief">
			{loading ? (
				<Loading />
			) : (
				<div className="container m-auto">
					<div className="latest">
						<h2>
							{lang === "en"
								? "Take a look on our Blogs"
								: lang === "am"
								? "ብሎጎቻችንን ይመልከቱ"
								: "تصفح مدوناتنا"}
						</h2>
						<div className="news-cont">
							{data.map((item, index) => (
								<div className="news" key={index}>
									<Image
										src={item.cover}
										alt="Orient"
										width={200}
										height={200}
									/>
									<div className="news-data">
										<div className="text">
											<h3>{item.title}</h3>
											<p className={`${lang === "ar" ? "text-right" : ""}`}>{item.description}</p>
										</div>
										<a href={`/blog?id=${item.id}`}>
											<div className="arrow">
												<i className="fa-solid fa-chevron-right"></i>
											</div>
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
