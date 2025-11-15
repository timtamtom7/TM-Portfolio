'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface ShowcasePageProps {
	onBack: () => void;
}

export default function ShowcasePage({ onBack }: ShowcasePageProps) {
	const { theme } = useTheme();
	const [isExiting, setIsExiting] = useState(false);

	const handleBack = () => {
		setIsExiting(true);
		setTimeout(() => onBack(), 1200);
	};

	return (
		<>
			<div
				className="fixed inset-0 z-40 flex items-center justify-center"
				style={{
					backgroundColor: theme === 'day' || theme === 'sunrise' ? 'rgba(255, 255, 255, 1)' : 'rgba(20, 20, 20, 1)',
					animation: isExiting ? 'slideOutRight 1.2s linear forwards' : 'slideInRight 1.2s linear forwards',
				}}
			>
				<div className="flex items-center justify-center h-full">
					<p style={{ color: theme === 'day' || theme === 'sunrise' ? 'rgba(20, 20, 20, 0.4)' : 'rgba(237, 237, 237, 0.4)' }} className="text-2xl">
						Placeholder
					</p>
				</div>

				<button
					onClick={handleBack}
					className="fixed bottom-8 left-8 z-50 flex items-center gap-2 transition-all duration-300 hover:opacity-70"
					style={{
						color: theme === 'day' || theme === 'sunrise' ? 'rgba(30, 30, 30, 1)' : 'rgba(220, 220, 220, 1)',
						fontSize: '14px',
						fontWeight: '300',
						borderBottom: `1px solid ${theme === 'day' || theme === 'sunrise' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(220, 220, 220, 0.6)'}`,
						paddingBottom: '2px',
					}}
				>
					<ArrowLeft size={14} />
					back to gallery
				</button>
			</div>

			<style jsx>{`
				@keyframes slideInRight {
					from {
						transform: translateX(100%);
					}
					to {
						transform: translateX(0);
					}
				}

				@keyframes slideOutRight {
					from {
						transform: translateX(0);
					}
					to {
						transform: translateX(100%);
					}
				}
			`}</style>
		</>
	);
}
