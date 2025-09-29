"use client";

import Image from "next/image";
import React from "react";

export default function PackageHero({ data }) {
	const { image, text } = data;

	return (
		<div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
			<div className="w-full h-full">
				<Image
							src={image}
							alt=""
							fill
							className="object-cover w-full h-full"
							priority
				/>
			</div>
			{/* white overlay */}
			<div className="absolute inset-0 bg-white/50 z-10 pointer-events-none" />
			{/* Centered text */}
			<div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
				<h1 className="text-black text-4xl md:text-5xl font-bold text-center drop-shadow-lg">
					{text}
				</h1>
			</div>
		</div>
	);
}
