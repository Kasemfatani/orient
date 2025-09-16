"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import CountryHero from "@/components/packages/country-selection/CountryHero";

const heroData = {
	images: ["/gallery/1.png", "/gallery/2.png", "/gallery/6.png"],
	text: "Choose the country",
};

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

	return <>{loading ? <Loading /> : <CountryHero data={heroData} />}</>;
}
