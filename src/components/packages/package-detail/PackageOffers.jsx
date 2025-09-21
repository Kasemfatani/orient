import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export default function PackageOffers({ offers }) {
	return (
		<Card className="p-6 mt-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Offer Includes */}
				<div>
					<h3 className="text-xl font-bold text-green-700 mb-4">
						Offer includes
					</h3>
					<ul className="space-y-3">
						{offers.includes.map((item, idx) => (
							<li key={idx} className="flex items-start gap-3">
								<div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
									<Check className="w-4 h-4 text-green-600" />
								</div>
								<span className="text-gray-700 leading-relaxed">{item}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Offer Excludes */}
				<div>
					<h3 className="text-xl font-bold text-red-700 mb-4">
						Offer excludes
					</h3>
					<ul className="space-y-3">
						{offers.excludes.map((item, idx) => (
							<li key={idx} className="flex items-start gap-3">
								<div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
									<X className="w-4 h-4 text-red-600" />
								</div>
								<span className="text-gray-700 leading-relaxed">{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Card>
	);
}
