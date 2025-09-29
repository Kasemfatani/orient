"use client";
import React, { useState, useEffect, useRef } from "react";
import logo from "/public/images/logo.png";
import global from "/public/global.svg";
import bars from "/public/images/bars.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
	const [opened, setOpened] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [showNav, setShowNav] = useState(true);
	const overlayRef = useRef(null);

	function openLinks() {
		const newOpenedState = !opened;
		setOpened(newOpenedState);

		// Use the ref to access the DOM element directly
		if (overlayRef.current) {
			overlayRef.current.style.transform = newOpenedState
				? "translateX(0)"
				: "translateX(-100%)";
		}
	}

	useEffect(() => {
		const controlNavbar = () => {
			if (typeof window !== "undefined") {
				const currentScrollY = window.scrollY;

				if (currentScrollY > lastScrollY && currentScrollY > 100) {
					// Scrolling down
					setShowNav(false);
				} else if (currentScrollY < lastScrollY) {
					// Scrolling up
					setShowNav(true);
				}

				setLastScrollY(currentScrollY);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);

			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}, [lastScrollY]);

	const [lang, setLang] = useState("en");
	const [showLangDropdown, setShowLangDropdown] = useState(false);

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
	}, []); // Remove lang from dependency array to prevent infinite loop

	const handleLanguageChange = (selectedLang) => {
		localStorage.setItem("lang", selectedLang);
		setLang(selectedLang);
		setShowLangDropdown(false);
		window.location.reload();
	};

	return (
		<div className="head-all">
			<div
				className="nav-section"
				style={{
					transform: showNav ? "scale(1)" : "scale(0)",
					opacity: showNav ? 1 : 0,
					pointerEvents: showNav ? "auto" : "none",
				}}
			>
				<div className="container m-auto">
					<div className="l-side">
						<Link href="/" className="logo">
							<Image src={logo} alt="orient" className="img-logo" />
						</Link>
					</div>
					<div className="r-side">
						<div
							className="language"
							onClick={() => setShowLangDropdown((prev) => !prev)}
							style={{ position: "relative" }}
						>
							<Image src={global} alt="orient" className="img-language" />
							{showLangDropdown && (
								<div
									className="lang-dropdown"
									style={{
										position: "absolute",
										top: "100%",
										right: 0,
										background: "#fff",
										border: "1px solid #ddd",
										borderRadius: 4,
										zIndex: 10,
										minWidth: 100,
									}}
								>
									<div
										style={{
											padding: "8px 16px",
											cursor: "pointer",
											background: lang === "en" ? "#f0f0f0" : "transparent",
										}}
										onClick={() => handleLanguageChange("en")}
									>
										English
									</div>
									<div
										style={{
											padding: "8px 16px",
											cursor: "pointer",
											background: lang === "am" ? "#f0f0f0" : "transparent",
										}}
										onClick={() => handleLanguageChange("am")}
									>
										አማርኛ
									</div>
									<div
										style={{
											padding: "8px 16px",
											cursor: "pointer",
											background: lang === "ar" ? "#f0f0f0" : "transparent",
										}}
										onClick={() => handleLanguageChange("ar")}
									>
										العربية
									</div>
								</div>
							)}
						</div>
						<div className="bars" onClick={openLinks}>
							<Image src={bars} alt="orient" className="menu-bars" />
						</div>
					</div>
				</div>
			</div>
			<div
				ref={overlayRef}
				className="herader-overly-content"
				style={{ transform: "translateX(-100%)" }}
			>
				<div className="links">
					<Link href="/" onClick={openLinks}>
						{lang === "en" ? "Home" : lang === "am" ? "መነሻ" : "الرئيسية"}
					</Link>
					<Link href="/#about" onClick={openLinks}>
						{lang === "en" ? "About" : lang === "am" ? "ስለኛ" : "من نحن"}
					</Link>
					<Link href="/#services" onClick={openLinks}>
						{lang === "en" ? "Services" : lang === "am" ? "አገልግሎቶች" : "الخدمات"}
					</Link>
					<Link href="/packages" onClick={openLinks}>
						{lang === "en" ? "Packages" : lang === "am" ? "ጥቅሎች" : "الباقات"}
					</Link>
					<Link href="/#contact" onClick={openLinks}>
						{lang === "en" ? "Contact US" : lang === "am" ? "ያግኙን" : "اتصل بنا"}
					</Link>
					<Link href="/blogs" onClick={openLinks}>
						{lang === "en" ? "Blogs" : lang === "am" ? "ብሎጎች" : "المدونات"}
					</Link>
				</div>
			</div>
		</div>
	);
}
