"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-number-input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion"; // Importing the motion component from Framer Motion for animations
import axios from "axios";
import { Textarea } from "../ui/textarea";
import { API_BASE_URL } from "@/lib/apiConfig";
import { toast } from "sonner";
export default function FormPage({ lang }) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const sendPostRequest = async (data) => {
		const url = `${API_BASE_URL}/landing/home/contact-us`;
		const queryParams = {
			customer_name: data?.name,
			customer_mobile: data?.phone,
			customer_email: data?.email,
			company_name: data.company,
			message: data.comments,
		};
		return axios({
			method: "post",
			url: url,
			data: queryParams,
			headers: {
				lang: lang,
			},
		}).then((response) => {
			const message = response.data?.message || "Operation successful";
			if (response.status === 200) {
				// Success toast notification
				toast(message, {
					style: {
						borderColor: "#28a745",
						boxShadow: "0px 0px 10px rgba(40, 167, 69, .5)",
					},
				});
				// Redirect or perform additional actions
				form.reset(); // Reset form fields
			} else {
				// Handle unexpected responses
				toast(errorMessage, {
					style: {
						borderColor: "#dc3545",
						boxShadow: "0px 0px 10px rgba(220, 53, 69, .5)",
					},
					description: "Unexpected response",
				});
			}
		});
	};

	const formSchema = z.object({
		name: z
			.string()
			.min(1, { message: "Name is required" })
			.max(50, { message: "Name must be at most 50 characters" }),
		company: z
			.string()
			.min(1, { message: "Company name is required" })
			.max(100, { message: "Name must be at most 50 characters" }),
		phone: z
			.string()
			.refine(validator.isMobilePhone, { message: "Invalid phone number" }),
		email: z.string().email({ message: "Invalid email address" }),
		comments: z
			.string()
			.max(500, { message: "Comments must be at most 500 characters" }),
	});
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			phone: "",
			email: "",
			comments: "",
			company: "",
			// captcha: '',
		},
	});
	const Submit = (data) => {
		sendPostRequest(data);
		// toast('Sent successful', {
		//     style: {
		//         borderColor: "#28a745",
		//         boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)'
		//     },
		// })
	};
	return (
		// loading ? <div className="w-full"><Loading /> </div> :
		<motion.div
			initial={{ opacity: 0, x: -300 }} // Initial animation state (faded and shifted left)
			whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
			viewport={{ once: true }}
			transition={{
				delay: 0.2,
				// type: 'spring', // Using spring animation for smooth motion
				bounce: 0.2, // Small bounce effect for the animation
			}}
			className={`w-full form form-contact-alaa`}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(Submit)} dir={lang === "ar" ? "rtl" : ""}>
					<motion.div
						initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
						whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
						viewport={{ once: true }}
						transition={{
							delay: 0.3,
							// type: 'spring', // Using spring animation for smooth motion
							bounce: 0.2, // Small bounce effect for the animation
						}}
					>
						<FormField
							control={form.control}
							name="name"
							className="w-full"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{lang === "en"
											? "Full Name"
											: lang === "am"
											? "አባድ"
											: "الاسم الكامل"}
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder={
												lang === "en"
													? "Mohamed Maher"
													: lang === "am"
													? "ኢትዮን አሳደ"
													: "محمد ماهر"
											}
											{...field}
										/>
									</FormControl>
									<FormMessage className="form-message" />
								</FormItem>
							)}
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
						whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
						viewport={{ once: true }}
						transition={{
							delay: 0.4,
							// type: 'spring', // Using spring animation for smooth motion
							bounce: 0.2, // Small bounce effect for the animation
						}}
					>
						<FormField
							className="w-full"
							control={form.control}
							name="email" // Field for phone number
							render={({ field }) => (
								<FormItem className={`w-full `}>
									<FormLabel className="">
										{lang === "en"
											? "Email"
											: lang === "am"
											? "ኢትዮ"
											: "البريد الإلكتروني"}
									</FormLabel>{" "}
									{/* Label for phone number */}
									<FormControl className="" dir="ltr">
										<Input
											type="email"
											placeholder="Email@email.com"
											{...field}
										/>
									</FormControl>
									<FormMessage className="form-message" />{" "}
									{/* Displaying validation messages */}
								</FormItem>
							)}
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
						whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
						viewport={{ once: true }}
						transition={{
							delay: 0.4,
							// type: 'spring', // Using spring animation for smooth motion
							bounce: 0.2, // Small bounce effect for the animation
						}}
					>
						<FormField
							className="w-full"
							control={form.control}
							name="phone" // Field for phone number
							render={({ field }) => (
								<FormItem className={`w-full `}>
									<FormLabel className="">
										{lang === "en"
											? "Phone Number"
											: lang === "am"
											? "ቦታ"
											: "رقم الهاتف"}
									</FormLabel>{" "}
									{/* Label for phone number */}
									<FormControl className="">
										<PhoneInput
											placeholder="+965 00000000"
											defaultCountry="SA"
											className="phoneInput-cont"
											{...field}
										/>
									</FormControl>
									<FormMessage className="form-message" />{" "}
									{/* Displaying validation messages */}
								</FormItem>
							)}
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
						whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
						viewport={{ once: true }}
						transition={{
							delay: 0.3,
							// type: 'spring', // Using spring animation for smooth motion
							bounce: 0.2, // Small bounce effect for the animation
						}}
					>
						<FormField
							control={form.control}
							name="company"
							className="w-full"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										{lang === "en"
											? "Company Name"
											: lang === "am"
											? "አበባ"
											: "اسم الشركة"}
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder={
												lang === "en"
													? "Almaher"
													: lang === "am"
													? "ኢትዮ"
													: "الماهر"
											}
											{...field}
										/>
									</FormControl>
									<FormMessage className="form-message" />
								</FormItem>
							)}
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 100 }} // Initial animation state (faded and shifted left)
						whileInView={{ opacity: 1, x: 0 }} // Animation state when in view (fully visible and reset position)
						viewport={{ once: true }}
						transition={{
							delay: 0.6,
							// type: 'spring', // Using spring animation for smooth motion
							bounce: 0.2, // Small bounce effect for the animation
						}}
						className="text-area-cont"
					>
						<FormField
							className=""
							control={form.control}
							name="comments"
							render={({ field }) => (
								<FormItem className="">
									<FormControl>
										<Textarea
											type="textarea"
											{...field}
											placeholder={
												lang === "en"
													? "Tell us more about your company and the type of service"
													: lang === "am"
													? "እባይንንድን እንደምንችል እንደምንችል እንደምንችል"
													: "أخبرنا المزيد عن شركتك ونوع الخدمة"
											}
											className=""
										/>
									</FormControl>
									<FormMessage className="" />
								</FormItem>
							)}
						/>
					</motion.div>
					<Button
						disabled={loading}
						type="submit"
						className={`${
							loading ? "opacity-50" : ""
						} text-xl py-4 rounded-xl min-w-32 h-13 submit `}
					>
						{lang === "en" ? "Submit" : lang === "am" ? "አስገባ" : "إرسال"}
					</Button>
				</form>
			</Form>
		</motion.div>
	);
}
