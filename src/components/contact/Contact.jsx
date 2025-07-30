"use client";
import React, { useEffect, useState } from "react";
import MazarInfo from "./MazarInfo";
import FormPage from "./FormPage";
import img1 from "/public/images/shake.png";

export default function Contact() {
	let [lang, setLang] = useState("en"); // Start with "en" instead of null

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

	// console.log("Current language set to:", lang);

	return (
		<div
			className="book-main-page"
			id="contact"
			style={{
				backgroundImage: `url(${img1.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				backgroundAttachment: "fixed",
			}}
		>
			<div className="overlay">
				<div className="container m-auto">
					<h2 className="h2-form-contact">
						{lang === "en"
							? "Let’s work together"
							: lang === "am"
							? "አብረን እንስራ"
							: "دعونا نعمل معا"}
					</h2>
					<p className="p-form-contact">
						{lang === "en"
							? "Let's discuss how we can support your Travrls and ummrah services"
							: lang === "am"
							? "የጉዞ እና የዑምራ አገልግሎቶችን እንዴት መደገፍ እንደምንችል እንወያይ"
							: "دعونا نناقش كيف يمكننا دعم خدمات السفر والعمرة الخاصة بك"}
					</p>
					<div className="book-cont">
						<MazarInfo />
						<FormPage lang={lang} />
					</div>
				</div>
			</div>
		</div>
	);
}
