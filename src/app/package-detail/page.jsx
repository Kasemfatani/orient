"use client";

import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import PackageDetailSection from "@/components/packages/package-detail/PackageDetailSection";
import PackageHero from "@/components/packages/package-detail/PackageHero";
import PackageSummary from "@/components/packages/package-detail/PackageSummary";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { getTranslation, isRTL } from "@/utils/translations";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function PackageDetail() {
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState(null);
    const [heroData, setHeroData] = useState(null);
    const [summaryData, setSummaryData] = useState(null);
    const [images, setImages] = useState([]);
    const [overviewData, setOverviewData] = useState(null);
    const [offersData, setOffersData] = useState(null);
    const [hasData, setHasData] = useState(true);

    const searchParams = useSearchParams();
    const packageId = searchParams.get("id");

    // Form fields with translations
    const getFormFields = (lang) => [
        { label: getTranslation("name", lang), type: "text", placeholder: getTranslation("name", lang) },
        { label: getTranslation("email", lang), type: "email", placeholder: getTranslation("email", lang) },
        { label: getTranslation("countryCode", lang), type: "text", placeholder: "+966" },
        { label: getTranslation("phone", lang), type: "text", placeholder: getTranslation("phone", lang) },
        { label: getTranslation("nationality", lang), type: "text", placeholder: getTranslation("nationality", lang) },
        { label: getTranslation("adults", lang), type: "number", placeholder: getTranslation("adults", lang) },
        { label: getTranslation("children", lang), type: "number", placeholder: getTranslation("children", lang) },
        { label: getTranslation("rooms", lang), type: "number", placeholder: getTranslation("rooms", lang) },
        { label: getTranslation("dateOfTravel", lang), type: "date", placeholder: getTranslation("dateOfTravel", lang) },
    ];

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
        if (!lang || !packageId) {
            setLoading(false);
            setHasData(false);
            return;
        }

        setLoading(true);
        const headers = { lang };

        axios
            .get(`${API_BASE_URL}/landing/home/package-detail?id=${packageId}`, { headers })
            .then((response) => {
                const apiData = response.data?.data;

                if (apiData && apiData.hero && apiData.summary && apiData.offers) {
                    // Set hero data
                    setHeroData({
                        image: apiData.hero.image || "/gallery/1.png",
                        text: apiData.hero.text || getTranslation("packages", lang),
                    });

                    // Set summary data
                    setSummaryData(apiData.summary);

                    // Set images
                    setImages(apiData.images.length > 0 ? apiData.images : ["/gallery/1.png", "/gallery/2.png"]);

                    // Set overview data with translation
                    setOverviewData({
                        title: getTranslation("overview", lang),
                        content: apiData.overview.content || "",
                    });

                    // Set offers data
                    setOffersData(apiData.offers);

                    setHasData(true);
                } else {
                    setHasData(false);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching package detail data:", error);
                setHasData(false);
                setLoading(false);
            });
    }, [lang, packageId]);
    console.log("summaryData", summaryData);

    if (loading) {
        return <Loading />;
    }

    const rtl = isRTL(lang);

    if (!packageId) {
        return (
            <div className={`min-h-screen flex items-center justify-center`} dir={rtl ? "rtl" : "ltr"}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-600 mb-4">
                        {getTranslation("invalidPackage", lang)}
                    </h2>
                    <p className="text-gray-500">
                        {getTranslation("invalidPackageDesc", lang)}
                    </p>
                </div>
            </div>
        );
    }

    if (!hasData) {
        return (
            <div className={`min-h-screen flex items-center justify-center`} dir={rtl ? "rtl" : "ltr"}>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-600 mb-4">
                        {getTranslation("packageNotFound", lang)}
                    </h2>
                    <p className="text-gray-500">
                        {getTranslation("packageNotFoundDesc", lang)}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div  dir={rtl ? "rtl" : "ltr"}>
            <PackageHero data={heroData} />
            <PackageSummary summary={summaryData} lang={lang} />
            <PackageDetailSection
                images={images}
                formFields={getFormFields(lang)}
                overview={overviewData}
                offers={offersData}
                lang={lang}
            />
        </div>
    );
}
