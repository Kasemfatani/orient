"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import CountryHero from "@/components/packages/country-selection/CountryHero";
import CountryCard from "@/components/packages/country-selection/CountryCard";

const heroData = {
	images: ["/gallery/1.png", "/gallery/2.png", "/gallery/6.png"],
	text: "Choose the country",
};

const countryCards = [
	{
		images: ["/gallery/4.png", "/gallery/5.png"],
		text: "Ethiopia",
		href: "/package-list?id=1",
	},
	{
		images: ["/gallery/6.png", "/gallery/7.png"],
		text: "Nigeria",
		href: "/package-list?id=2",
	},
];

export default function Packages() {
	const [loading, setLoading] = useState(true);
	const [lang, setLang] = useState("en");

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
		setLoading(false);
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<CountryHero data={heroData} />
					<div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
						{countryCards.map((card, idx) => (
							<CountryCard key={idx} {...card} />
						))}
					</div>
				</>
			)}
		</>
	);
}
