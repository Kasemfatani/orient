import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PackageOverview({ overview }) {
	return (
		<Card className="p-6 mt-6">
			<CardHeader className="p-0 mb-4">
				<CardTitle className="text-2xl font-bold text-gray-800">
					{overview.title}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0 space-y-4">
				{/* Accommodation Details */}
				<div>
					<h3 className="font-semibold text-lg mb-2">Accommodation Details:</h3>
					<ul className="space-y-1">
						{overview.accommodation.map((item, idx) => (
							<li key={idx} className="flex items-start">
								<span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
								<span>
									<strong>{item.location}:</strong> {item.nights} nights at{" "}
									<strong>{item.hotel}</strong>
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* Prices per Person */}
				<div>
					<h3 className="font-semibold text-lg mb-2">Prices per Person:</h3>
					<ul className="space-y-1">
						{overview.prices.map((price, idx) => (
							<li key={idx} className="flex items-start">
								<span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
								<span>
									<strong>{price.roomType}:</strong> {price.price}
								</span>
							</li>
						))}
					</ul>
				</div>

				{/* Description */}
				<div className="text-gray-700 leading-relaxed">
					{overview.description}
				</div>

				{/* Notice */}
				{overview.notice && (
					<p className="text-sm italic">"{overview.notice}"</p>
				)}
			</CardContent>
		</Card>
	);
}
