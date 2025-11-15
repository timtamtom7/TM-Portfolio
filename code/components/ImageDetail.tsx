'use client';

import React, { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface ImageDetailProps {
	imageSrc: string;
	onClose: () => void;
	onShowcaseClick?: () => void;
}

export default function ImageDetail({ imageSrc, onClose, onShowcaseClick }: ImageDetailProps) {
	const { theme } = useTheme();

	useEffect(() => {
		const event = new CustomEvent('imageDetailChange', { detail: { isOpen: true } });
		window.dispatchEvent(event);

		return () => {
			const closeEvent = new CustomEvent('imageDetailChange', { detail: { isOpen: false } });
			window.dispatchEvent(closeEvent);
		};
	}, []);

	return (
		<div
			className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md"
			style={{
				animation: 'fadeIn 0.4s ease-out',
			}}
			onClick={onClose}
		>
			<div
				className="relative w-full h-full max-h-[95vh] flex gap-4 p-4 md:p-8"
				onClick={(e) => e.stopPropagation()}
				style={{
					animation: 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
				}}
			>
				{/* Left: Image */}
				<div className="flex-1 flex flex-col items-center justify-between relative">
					<img
						src={imageSrc || '/placeholder.svg'}
						alt="Detail view"
						className="max-w-full max-h-full object-contain rounded-lg"
					/>

					<div className="absolute bottom-4 right-4">
						<button
							onClick={onShowcaseClick}
							className="flex items-center gap-2 text-sm font-light transition-all duration-300 hover:opacity-70"
							style={{
								color: 'rgba(237, 237, 237, 0.8)',
								borderBottom: '1px solid rgba(237, 237, 237, 0.6)',
								paddingBottom: '2px',
							}}
						>
							enter showcase
							<ArrowRight size={14} />
						</button>
					</div>
				</div>

				<div className="w-80 flex flex-col relative">
					<button
						onClick={onClose}
						className="absolute top-0 right-0 z-50 p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
						aria-label="Close"
					>
						<X size={20} className="text-white" />
					</button>

					<div className="space-y-4 pt-6">
						<div>
							<h2 className="text-2xl font-light text-white mb-2">Image Showcase</h2>
							<p className="text-sm font-light text-gray-400">Moment Captured</p>
						</div>

						<p className="text-sm text-gray-300 leading-relaxed font-light">
							This is a placeholder for the image description. Add your own narrative about the composition, story, and creative vision behind this photograph.
						</p>
					</div>
				</div>
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

				@keyframes slideInRight {
					from {
						opacity: 0;
						transform: translateX(100%);
					}
					to {
						opacity: 1;
						transform: translateX(0);
					}
				}

				@keyframes slideOutLeft {
					from {
						opacity: 1;
						transform: translateX(0);
					}
					to {
						opacity: 0;
						transform: translateX(-100%);
					}
				}
			`}</style>
		</div>
	);
}
