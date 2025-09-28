"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import CountryHero from "@/components/packages/country-selection/CountryHero";
import CountryCard from "@/components/packages/country-selection/CountryCard";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";

const fallbackHeroData = {
	images: ["/gallery/1.png", "/gallery/2.png", "/gallery/6.png"],
	text: "Choose the country",
};

const fallbackCountryCards = [
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
	const [lang, setLang] = useState(null);
	const [heroData, setHeroData] = useState(fallbackHeroData);
	const [countryCards, setCountryCards] = useState(fallbackCountryCards);

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
	}, []);

	useEffect(() => {
		if (!lang) return;
		setLoading(true);
		const headers = { lang };
		axios
			.get(`${API_BASE_URL}/landing/home/country-selection`, {
				headers,
			})
			.then((response) => {
				const apiData = response.data?.data;
				if (
					apiData &&
					apiData.hero &&
					Array.isArray(apiData.countries) &&
					apiData.countries.length > 0
				) {
					setHeroData({
						images: apiData.hero.images,
						text: apiData.hero.text,
					});
					setCountryCards(
						apiData.countries.map((country) => ({
							images: country.images,
							text: country.name,
							href: `/package-list?id=${country.id}`,
						}))
					);
				} else {
					setHeroData(fallbackHeroData);
					setCountryCards(fallbackCountryCards);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching country selection data:", error);
				setHeroData(fallbackHeroData);
				setCountryCards(fallbackCountryCards);
				setLoading(false);
			});
	}, [lang]);

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
