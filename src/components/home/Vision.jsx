"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import bg from "/public/images/about/muslim.jpg";
import Loading from "@/app/loading";
import { motion } from "framer-motion"; // Importing the motion component from Framer Motion for animations
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
export default function Book() {
	const [lang, setLang] = useState("en");
	const [loading, setLoading] = useState(true);
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
		setLoading(true);
		const headers = {
			lang: lang, // Change language dynamically based on state
		};
		// Fetch data from the API with Axios
		axios
			.get(`${API_BASE_URL}/landing/home/mission`, { headers: headers })
			.then((response) => {
				setData(response.data.data); // Set the response data to state
				setLoading(false); // Set loading to false
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
				setLoading(false);
			});
	}, [lang]); // Run this effect whenever the `language` changes
	// console.log("Fetched data vision:", data, lang);
	return (
		<section
			className="vision-section"
			style={{
				backgroundImage: `url(${bg.src})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
			dir={lang === "ar" ? "rtl" : ""}
		>
			{loading ? (
				<Loading />
			) : (
				<div className="container m-auto">
					<div className="vision-cont">
						<motion.div
							initial={{ opacity: 0, x: -300 }} // Initial animation state (faded and shifted left)
							whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
							viewport={{ once: true }}
							transition={{
								delay: 0.2,
								// type: 'spring', // Using spring animation for smooth motion
								bounce: 0.2, // Small bounce effect for the animation
							}}
							className="vision-item"
						>
							<div className="vision-content">
								<h3>{data?.vision.title}</h3>
								<p> {data?.vision.description} </p>
							</div>
							<div className="vision-img-cont">
								<div className="vision-img">
									<figure>
										{data?.vision?.image ? (
											<Image
												src={data.vision.image}
												width={200}
												height={200}
												alt="vision"
											/>
										) : null}
									</figure>
								</div>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -300 }} // Initial animation state (faded and shifted left)
							whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
							viewport={{ once: true }}
							transition={{
								delay: 0.2,
								// type: 'spring', // Using spring animation for smooth motion
								bounce: 0.2, // Small bounce effect for the animation
							}}
							className="vision-item"
						>
							<div className="vision-content">
								<h3>{data?.mission.title}</h3>
								<p> {data?.mission.description} </p>
							</div>
							<div className="vision-img-cont">
								<div className="vision-img">
									<figure>
										{data?.mission?.image ? (
											<Image
												src={data.mission.image}
												width={200}
												height={200}
												alt="mission"
											/>
										) : null}
									</figure>
								</div>
							</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, x: -300 }} // Initial animation state (faded and shifted left)
							whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
							viewport={{ once: true }}
							transition={{
								delay: 0.2,
								// type: 'spring', // Using spring animation for smooth motion
								bounce: 0.2, // Small bounce effect for the animation
							}}
							className="vision-item"
						>
							<div className="vision-content">
								<h3>{data?.goals.title}</h3>
								<p> {data?.goals.description} </p>
							</div>
							<div className="vision-img-cont">
								<div className="vision-img">
									<figure>
										{data?.goals?.image ? (
											<Image
												src={data.goals.image}
												width={200}
												height={200}
												alt="goals"
											/>
										) : null}
									</figure>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			)}
		</section>
	);
}
