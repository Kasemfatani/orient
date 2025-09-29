import React from "react";
import PackageImageSlider from "./PackageImageSlider";
import PackageInquiryForm from "./PackageInquiryForm";
import PackageOverview from "./PackageOverview";
import PackageOffers from "./PackageOffers";

export default function PackageDetailSection({
	images,
	formFields,
	overview,
	offers,
	lang = "en",
	packageId,
}) {
	return (
		<section className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 my-8">
			{/* Left: Images */}
			<div className="md:col-span-8 lg:col-span-9">
				<PackageImageSlider images={images} />
				<PackageOverview overview={overview} lang={lang} />
				<PackageOffers offers={offers} lang={lang} />
			</div>
			{/* Right: Form */}
			<div className="md:col-span-4 lg:col-span-3">
				<PackageInquiryForm fields={formFields}  lang={lang} packageId={packageId} />
			</div>
		</section>
	);
}
