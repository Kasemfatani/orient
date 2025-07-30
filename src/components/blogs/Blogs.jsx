"use client";
import React, { useEffect, useState } from "react";
import img1 from "/public/images/detservices/nn.jpg";
import BloggGrid from "./BlogsGrid";
import ServiceTop from "../service/ServiceTop";

export default function Advant() {
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
	}, []);
	return (
		<div className="blogs-main-page" dir={lang === "ar" ? "rtl" : ""}>
			<ServiceTop
				img={img1}
				title={
					lang === "en" ? "Our Blogs" : lang === "am" ? "ብሎጎቻችን" : "مدوناتنا"
				}
			/>
			<BloggGrid />
		</div>
	);
}
