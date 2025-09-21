import { MapPin, Clock, BadgeDollarSign } from "lucide-react";
import React from "react";

export default function PackageSummary({ summary }) {
	return (
		<div className="w-full bg-white rounded-2xl shadow flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-6 md:gap-0 -mt-10 relative z-30 max-w-5xl mx-auto">
			{/* Location */}
			<div className="flex items-center gap-2 flex-1 justify-center">
				<MapPin className="text-yellow-500 w-5 h-5" />
				<span className="font-semibold ">{summary.location}</span>
			</div>
			{/* Duration */}
			<div className="flex items-center gap-2 flex-1 justify-center">
				<Clock className="text-yellow-500 w-5 h-5" />
				<span className="font-semibold ">{summary.duration}</span>
			</div>
			{/* Price */}
			<div className="flex items-center gap-2 flex-1 justify-center">
				<BadgeDollarSign className="text-yellow-500 w-5 h-5" />
				<span className="font-semibold ">
					Price Start From{" "}
					<span className="text-yellow-600 font-bold">{summary.price}</span> SAR
				</span>
			</div>
		</div>
	);
}
