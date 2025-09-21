import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PackageInquiryForm({ fields }) {
	return (
		<Card className="bg-white shadow-lg rounded-2xl">
			<CardHeader>
				<CardTitle className="text-green-900 text-lg font-bold border-b pb-2">
					Booking & Inquiries
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="flex flex-col gap-3">
					{fields.map((field, idx) => (
						<div key={idx} className="flex flex-col gap-1">
							<label className="text-sm font-semibold text-green-900">
								{field.label}
							</label>
							<input
								type={field.type}
								placeholder={field.placeholder}
								className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>
					))}
					{/* Example radio group for ticket booked */}
					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-green-900">
							Is the Ticket booked?
						</label>
						<div className="flex gap-4">
							<label className="flex items-center gap-1">
								<input type="radio" name="ticket" value="yes" /> Yes
							</label>
							<label className="flex items-center gap-1">
								<input type="radio" name="ticket" value="no" /> No
							</label>
						</div>
					</div>
					<Button type="submit" className="mt-2 w-full">
						SEND
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
