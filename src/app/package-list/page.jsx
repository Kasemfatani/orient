"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import CountryHero from "@/components/packages/country-selection/CountryHero";
import PackageListSection from "@/components/packages/package-list/PackageListSection";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { getTranslation, isRTL } from "@/utils/translations";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function PackageList() {
	const [loading, setLoading] = useState(true);
	const [lang, setLang] = useState(null);
	const [heroData, setHeroData] = useState(null);
	const [types, setTypes] = useState([]);
	const [packages, setPackages] = useState([]);
	const [hasData, setHasData] = useState(true);

	const searchParams = useSearchParams();
	const countryId = searchParams.get("id");

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

		// Set fallback hero data based on language
		const fallbackHeroData = {
			images: ["/gallery/4.png", "/gallery/5.png"],
			text: getTranslation("noCountry", lang),
		};
		setHeroData(fallbackHeroData);

		if (!countryId) {
			setLoading(false);
			setHasData(false);
			return;
		}

		setLoading(true);
		const headers = { lang };

		axios
			.get(
				`${API_BASE_URL}/landing/home/package-list?id=${countryId}`,
				{ headers }
			)
			.then((response) => {
				const apiData = response.data?.data;

				if (
					apiData &&
					apiData.hero &&
					Array.isArray(apiData.types) &&
					Array.isArray(apiData.packages)
				) {
					setHeroData({
						images:
							apiData.hero.images.length > 0
								? apiData.hero.images
								: ["/gallery/4.png"],
						text: apiData.hero.text || getTranslation("packages", lang),
					});

					setTypes(apiData.types);
					setPackages(
						apiData.packages.map((pkg) => ({
							id: pkg.id,
							image: pkg.main_image || "/gallery/1.png",
							title: pkg.title,
							places: pkg.cities.map((city) => city.name),
							days: pkg.total_days,
							nights: pkg.cities.reduce((acc, city) => {
								acc[city.name] = city.days;
								return acc;
							}, {}),
							type_id: pkg.type_id,
							price: parseFloat(pkg.price),
							href: `/package-detail?id=${pkg.id}`,
						}))
					);

					setHasData(apiData.types.length > 0 || apiData.packages.length > 0);
				} else {
					setHasData(false);
				}
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching package list data:", error);
				setHasData(false);
				setLoading(false);
			});
	}, [lang, countryId]);

	if (loading) {
		return <Loading />;
	}

	const rtl = isRTL(lang);

	if (!countryId) {
		return (
			<div
				className={`min-h-screen flex items-center justify-center${
					rtl ? " rtl" : ""
				}`}
				dir={rtl ? "rtl" : "ltr"}
			>
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-600 mb-4">
						{getTranslation("invalidCountry", lang)}
					</h2>
					<p className="text-gray-500">
						{getTranslation("invalidCountryDesc", lang)}
					</p>
				</div>
			</div>
		);
	}

	if (!hasData) {
		return (
			<div className={rtl ? "rtl" : ""} dir={rtl ? "rtl" : "ltr"}>
				<CountryHero data={heroData} />
				<div className="min-h-[50vh] flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-2xl font-bold text-gray-600 mb-4">
							{getTranslation("noData", lang)}
						</h2>
						<p className="text-gray-500">
							{getTranslation("noPackages", lang)}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={rtl ? "rtl" : ""} dir={rtl ? "rtl" : "ltr"}>
			<CountryHero data={heroData} />
			<div className="max-w-7xl mx-auto px-4 py-12">
				<PackageListSection types={types} packages={packages} lang={lang} />
			</div>
		</div>
	);
}
