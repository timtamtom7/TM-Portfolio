'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ContactFormProps {
	onClose: () => void;
}

export default function ContactForm({ onClose }: ContactFormProps) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitted(true);
		setTimeout(() => {
			onClose();
			setIsSubmitted(false);
		}, 2000);
	};

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md"
			onClick={onClose}
			style={{
				animation: 'fadeIn 0.3s ease-out',
			}}
		>
			<div
				className="relative w-full max-w-md mx-4 p-8 rounded-2xl"
				onClick={(e) => e.stopPropagation()}
				style={{
					backgroundColor: 'rgba(20, 20, 30, 0.5)',
					backdropFilter: 'blur(30px) saturate(1.8)',
					border: '1px solid rgba(255, 255, 255, 0.15)',
					boxShadow:
						'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(31, 38, 135, 0.37)',
					animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
				}}
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
					aria-label="Close"
				>
					<X size={20} className="text-white/60 hover:text-white" />
				</button>

				{!isSubmitted ? (
					<>
						<h2 className="text-xl font-sans text-white mb-2 font-light tracking-wide">Get in Touch</h2>
						<p className="text-sm font-sans text-gray-300 mb-6 font-light">
							Send me a message and I'll respond as soon as possible.
						</p>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="text-xs font-sans text-gray-400 block mb-2 font-light">
									Name
								</label>
								<input
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 rounded-lg text-sm font-sans transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.05)',
										border: '1px solid rgba(255, 255, 255, 0.1)',
										color: 'rgba(237, 237, 237, 0.9)',
									}}
									placeholder="Your name"
								/>
							</div>

							<div>
								<label className="text-xs font-sans text-gray-400 block mb-2 font-light">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 rounded-lg text-sm font-sans transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.05)',
										border: '1px solid rgba(255, 255, 255, 0.1)',
										color: 'rgba(237, 237, 237, 0.9)',
									}}
									placeholder="your@email.com"
								/>
							</div>

							<div>
								<label className="text-xs font-sans text-gray-400 block mb-2 font-light">
									Subject
								</label>
								<input
									type="text"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									required
									className="w-full px-4 py-2 rounded-lg text-sm font-sans transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.05)',
										border: '1px solid rgba(255, 255, 255, 0.1)',
										color: 'rgba(237, 237, 237, 0.9)',
									}}
									placeholder="What is this about?"
								/>
							</div>

							<div>
								<label className="text-xs font-sans text-gray-400 block mb-2 font-light">
									Message
								</label>
								<textarea
									name="message"
									value={formData.message}
									onChange={handleChange}
									required
									rows={4}
									className="w-full px-4 py-2 rounded-lg text-sm font-sans transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
									style={{
										backgroundColor: 'rgba(255, 255, 255, 0.05)',
										border: '1px solid rgba(255, 255, 255, 0.1)',
										color: 'rgba(237, 237, 237, 0.9)',
									}}
									placeholder="Your message..."
								/>
							</div>

							<button
								type="submit"
								className="w-full mt-6 px-4 py-2 rounded-lg text-sm font-sans transition-all duration-300 hover:bg-white/10 font-light"
								style={{
									backgroundColor: 'rgba(255, 255, 255, 0.08)',
									border: '1px solid rgba(255, 255, 255, 0.2)',
									color: 'rgba(237, 237, 237, 0.9)',
								}}
							>
								Send Message
							</button>
						</form>
					</>
				) : (
					<div className="text-center py-8">
						<div className="text-4xl mb-3">✓</div>
						<p className="text-sm font-sans text-white font-light">Message sent!</p>
						<p className="text-xs font-sans text-gray-400 mt-2 font-light">
							Thank you for reaching out.
						</p>
					</div>
				)}
			</div>

			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes slideUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
