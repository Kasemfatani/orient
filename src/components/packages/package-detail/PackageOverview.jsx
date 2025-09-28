import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import parse from 'html-react-parser';

export default function PackageOverview({ overview, lang }) {
	return (
		<Card className="p-6 mt-6">
			<CardHeader className="p-0 mb-4">
				<CardTitle className="text-2xl font-bold text-gray-800">
					{overview.title}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0 space-y-4">
				<div>{parse(overview.content)}</div>
			</CardContent>
		</Card>
	);
}
