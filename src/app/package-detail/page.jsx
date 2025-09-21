"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";

import PackageDetailSection from "@/components/packages/package-detail/PackageDetailSection";
import PackageHero from "@/components/packages/package-detail/PackageHero";
import PackageSummary from "@/components/packages/package-detail/PackageSummary";

const heroData = {
	image: "/gallery/1.png",
	text: "Economic Package – 10 Days",
};

const summaryData = {
	location: "Al Madinah Al Munawwarah, Makkah",
	duration: "11 Days",
	price: "2195",
};

const images = [
	"/gallery/1.png",
	"/gallery/2.png",
	"/gallery/3.png",
	"/gallery/4.png",
	"/gallery/5.png",
];

const formFields = [
	{ label: "Name", type: "text", placeholder: "Name" },
	{ label: "Email", type: "email", placeholder: "Email" },
	{ label: "Country Code", type: "text", placeholder: "+966" },
	{ label: "Phone", type: "text", placeholder: "Phone" },
	{ label: "Nationality", type: "text", placeholder: "Nationality" },
	{ label: "Adults", type: "number", placeholder: "Adults" },
	{ label: "Children", type: "number", placeholder: "Children" },
	{ label: "Rooms", type: "number", placeholder: "Rooms" },
	{ label: "Date of Travel", type: "date", placeholder: "Date of Travel" },
];

const overviewData = {
	title: "Overview",
	accommodation: [
		{
			location: "Makkah",
			nights: 7,
			hotel: "Wahet Al-Dhafa Hotel",
		},
		{
			location: "Madinah",
			nights: 3,
			hotel: "Safa Taiba Hotel",
		},
	],
	prices: [
		{
			roomType: "Single Room",
			price: "SAR 6750 Per Person",
		},
		{
			roomType: "Double Room",
			price: "SAR 3660 Per Person",
		},
		{
			roomType: "Triple Room",
			price: "SAR 2630 Per Person",
		},
		{
			roomType: "Quadruple Room",
			price: "SAR 2195 Per Person",
		},
	],
	description:
		"A remarkable Umrah journey combining comfort, luxury, and comprehensive services to ensure a unique and spiritually fulfilling experience",
	notice:
		"The prices are subject to change based on time periods and are adjustable without prior notice. The final prices will be confirmed upon booking, depending on the request and period.",
};

const offersData = {
    includes: [
        "Visa issuance",
        "Hotel accommodation",
        "Reception from the airport to the hotel by private car",
        "Delivery from Mecca to Medina or vice versa",
        "Transfer from the hotel to the airport in a private car"
    ],
    excludes: [
        "Personal expenses"
    ]
};

export default function PackageDetail() {
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
					<PackageHero data={heroData} />
					<PackageSummary summary={summaryData} />
					<PackageDetailSection
						images={images}
						formFields={formFields}
						overview={overviewData}
						offers={offersData}
					/>
				</>
			)}
		</>
	);
}
