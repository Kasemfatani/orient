"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import CountryHero from "@/components/packages/country-selection/CountryHero";
import PackageListSection from "@/components/packages/package-list/PackageListSection";

const heroData = {
	images: ["/gallery/4.png", "/gallery/5.png"],
	text: "Ethiopia Packages",
};

export default function PackageList() {
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
					<div className="max-w-7xl mx-auto px-4 py-12">
						<PackageListSection />
					</div>
				</>
			)}
		</>
	);
}
