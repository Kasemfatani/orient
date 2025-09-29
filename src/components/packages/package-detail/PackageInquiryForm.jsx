import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getTranslation } from "@/utils/translations";
import { API_BASE_URL } from "@/lib/apiConfig";

export default function PackageInquiryForm({ fields, lang = "en", packageId }) {
	const [formData, setFormData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState("");
	const [isTicketBooked, setIsTicketBooked] = useState("");
	const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

	// Get today's date in YYYY-MM-DD format
	const today = new Date().toISOString().split("T")[0];

	const handleInputChange = (fieldLabel, value) => {
		// Map field labels to API field names
		const fieldMap = {
			[getTranslation("name", lang)]: "name",
			[getTranslation("email", lang)]: "email",
			[getTranslation("countryCode", lang)]: "country_code",
			[getTranslation("phone", lang)]: "phone",
			[getTranslation("nationality", lang)]: "nationality",
			[getTranslation("adults", lang)]: "adults",
			[getTranslation("children", lang)]: "children",
			[getTranslation("rooms", lang)]: "rooms",
			[getTranslation("dateOfTravel", lang)]: "date_of_travel",
		};

		const apiFieldName = fieldMap[fieldLabel] || fieldLabel.toLowerCase();
		setFormData((prev) => ({ ...prev, [apiFieldName]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage("");
		setSubmitStatus(null);

		try {
			// Add ticket booking info  to form data
			const submitData = {
				...formData,
				message: `Ticket booked: ${isTicketBooked || "Not specified"}`,
				package_id: packageId,
			};

			const storedLang = localStorage.getItem("lang") || "en";
			const headers = { lang: storedLang };

			const response = await axios.post(
				`${API_BASE_URL}/landing/home/package-inquiry`,
				submitData,
				{ headers }
			);

			if (response.data.status) {
				// setSubmitMessage(response.data.message);
				setSubmitMessage(getTranslation("inquirySuccess", lang));
				setSubmitStatus("success");
				setFormData({});
				setIsTicketBooked("");
				// Reset form
				e.target.reset();
			} else {
				setSubmitMessage(response.data.message || getTranslation("inquiryError", lang));
				setSubmitStatus("error");
			}
		} catch (error) {
			setSubmitMessage(
				error.response?.data?.message || getTranslation("somethingWentWrong", lang)
			);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="bg-white shadow-lg rounded-2xl">
			<CardHeader>
				<CardTitle className="text-green-900 text-lg font-bold border-b pb-2">
					{getTranslation("bookingInquiries", lang)}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
					{fields.map((field, idx) => (
						<div key={idx} className="flex flex-col gap-1">
							<label className="text-sm font-semibold text-green-900">
								{field.label}
							</label>
							<input
								type={field.type}
								placeholder={field.placeholder}
								className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
								onChange={(e) => handleInputChange(field.label, e.target.value)}
								required={
									field.label === getTranslation("name", lang) ||
									field.label === getTranslation("email", lang) ||
									field.label === getTranslation("phone", lang) ||
									field.label === getTranslation("countryCode", lang)
								}
								// Add min for number and date fields
								min={
									field.type === "number"
										? 0
										: field.type === "date"
										? today
										: undefined
								}
							/>
						</div>
					))}

					{/* Ticket booked radio group */}
					<div className="flex flex-col gap-1">
						<label className="text-sm font-semibold text-green-900">
							{getTranslation("isTicketBooked", lang)}
						</label>
						<div className="flex gap-4">
							<label className="flex items-center gap-1">
								<input
									type="radio"
									name="ticket"
									value="yes"
									onChange={(e) => setIsTicketBooked(e.target.value)}
								/>
								{getTranslation("yes", lang)}
							</label>
							<label className="flex items-center gap-1">
								<input
									type="radio"
									name="ticket"
									value="no"
									onChange={(e) => setIsTicketBooked(e.target.value)}
								/>
								{getTranslation("no", lang)}
							</label>
						</div>
					</div>

					<Button type="submit" className="mt-2 w-full" disabled={isSubmitting}>
						{isSubmitting
							? getTranslation("sending", lang)
							: getTranslation("send", lang)}
					</Button>

					{submitMessage && (
						<div
							className={`text-sm p-2 rounded ${
								submitStatus === "success"
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{submitMessage}
						</div>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
