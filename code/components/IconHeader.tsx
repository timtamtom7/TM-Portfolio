'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Sun, Moon, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import ContactForm from '@/components/ContactForm';

export default function IconHeader() {
	const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
	const [showContactForm, setShowContactForm] = useState(false);
	const [isImageDetailOpen, setIsImageDetailOpen] = useState(false);
	const [showAbout, setShowAbout] = useState(false);
	const [isAboutExiting, setIsAboutExiting] = useState(false);
	const [logoRotation, setLogoRotation] = useState(0);
	const { theme, setTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const handleImageDetailChange = (e: CustomEvent) => {
			setIsImageDetailOpen(e.detail.isOpen);
		};
		window.addEventListener('imageDetailChange' as any, handleImageDetailChange);
		return () => window.removeEventListener('imageDetailChange' as any, handleImageDetailChange);
	}, []);

	const iconButtons = [
		{
			id: 'theme',
			Icon: theme?.startsWith('night') ? Moon : Sun,
			label: 'Theme',
			tooltip: `Current: ${theme}`,
			onClick: () => {
				const themes = ['day', 'night', 'sunrise', 'sunset'];
				const currentIndex = themes.indexOf(theme || 'day');
				const newTheme = themes[(currentIndex + 1) % themes.length];
				setTheme(newTheme);
				window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
			},
		},
		{
			id: 'contact',
			Icon: Mail,
			label: 'Contact',
			tooltip: 'Get in touch',
			onClick: () => setShowContactForm(true),
		},
	];

	if (!isMounted) return null;

	const isDarkMode = theme === 'night' || theme === 'sunset';
	const logoSrc = isDarkMode ? '/logo-light.png' : '/logo-dark.png';

	const handleLogoHover = () => {
		setLogoRotation(logoRotation + 180);
	};

	const handleLogoClick = () => {
		if (showAbout) {
			setIsAboutExiting(true);
			setTimeout(() => {
				setShowAbout(false);
				setIsAboutExiting(false);
			}, 1200);
		} else {
			setShowAbout(true);
		}
	};

	return (
		<>
			{/* Logo Header */}
			<header className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-opacity duration-500 ${isImageDetailOpen ? 'opacity-0' : 'opacity-100'}`}>
				<div className="p-8 pointer-events-auto">
					<button
						onClick={handleLogoClick}
						onMouseEnter={handleLogoHover}
						className="transition-transform duration-700 ease-out"
						style={{
							transform: `rotateZ(${logoRotation}deg)`,
						}}
						aria-label="About"
					>
						<img src={logoSrc || "/placeholder.svg"} alt="Logo" className="h-12 w-12 object-contain" />
					</button>
				</div>
			</header>

			<header className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-opacity duration-500 ${isImageDetailOpen ? 'opacity-0' : 'opacity-100'}`}>
				<div className="flex items-center gap-6 p-8 pointer-events-auto">
					{iconButtons.map(({ id, Icon, label, tooltip, onClick }) => (
						<div key={id} className="relative">
							<button
								onMouseEnter={() => setActiveTooltip(id)}
								onMouseLeave={() => setActiveTooltip(null)}
								onClick={onClick}
								className="group relative p-1 transition-all duration-300 ease-out"
								aria-label={label}
							>
								<Icon
									size={18}
									strokeWidth={1.5}
									className="transition-all duration-300 ease-out"
									style={{
										color:
											activeTooltip === id
												? isDarkMode
													? 'rgba(237, 237, 237, 1)'
													: 'rgba(20, 20, 20, 1)'
												: isDarkMode
													? 'rgba(237, 237, 237, 0.6)'
													: 'rgba(20, 20, 20, 0.6)',
									}}
								/>

								{/* Tooltip */}
								{activeTooltip === id && (
									<div
										className="absolute bottom-8 left-1/2 -translate-x-1/2 px-3 py-2 text-xs font-mono pointer-events-none whitespace-nowrap"
										style={{
											backgroundColor: 'rgba(20, 20, 30, 0.4)',
											backdropFilter: 'blur(20px) saturate(1.8)',
											borderRadius: '12px',
											border: '1px solid rgba(255, 255, 255, 0.15)',
											boxShadow:
												'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(31, 38, 135, 0.37)',
											color: 'rgba(237, 237, 237, 0.9)',
											animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
										}}
									>
										{tooltip}
									</div>
								)}
							</button>
						</div>
					))}

					{/* Help button */}
					<div className="relative">
						<button
							onMouseEnter={() => setActiveTooltip('help')}
							onMouseLeave={() => setActiveTooltip(null)}
							className="group relative p-1 transition-all duration-300 ease-out"
							aria-label="Help"
						>
							<HelpCircle
								size={18}
								strokeWidth={1.5}
								className="transition-all duration-300 ease-out"
								style={{
									color:
										activeTooltip === 'help'
											? isDarkMode
												? 'rgba(237, 237, 237, 1)'
												: 'rgba(20, 20, 20, 1)'
											: isDarkMode
												? 'rgba(237, 237, 237, 0.6)'
												: 'rgba(20, 20, 20, 0.6)',
								}}
							/>

							{activeTooltip === 'help' && (
								<div
									className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 text-xs font-mono pointer-events-none"
									style={{
										backgroundColor: 'rgba(20, 20, 30, 0.4)',
										backdropFilter: 'blur(20px) saturate(1.8)',
										borderRadius: '12px',
										border: '1px solid rgba(255, 255, 255, 0.15)',
										boxShadow:
											'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 32px 0 rgba(31, 38, 135, 0.37)',
										color: 'rgba(237, 237, 237, 0.9)',
										padding: '10px 14px',
										lineHeight: '1.6',
										animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
										textAlign: 'center',
									}}
								>
									<p>
										<span className="font-bold">Scroll & arrow keys</span> to browse
									</p>
									<p className="mt-2">
										<span className="font-bold">Tap & hold</span> to interact
									</p>
								</div>
							)}
						</button>
					</div>
				</div>
			</header>

			{/* Contact Form Modal */}
			{showContactForm && (
				<ContactForm onClose={() => setShowContactForm(false)} />
			)}

			{/* About Page */}
			{showAbout && (
				<div
					className="fixed inset-0 z-40 flex items-center justify-center"
					style={{
						backgroundColor: theme === 'day' || theme === 'sunrise' ? 'rgba(255, 255, 255, 1)' : 'rgba(20, 20, 20, 1)',
						animation: isAboutExiting ? 'slideOutUp 1.2s linear forwards' : 'slideInDown 1.2s linear forwards',
					}}
					onClick={() => handleLogoClick()}
				>
					<div className="flex items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
						<p style={{ color: theme === 'day' || theme === 'sunrise' ? 'rgba(20, 20, 20, 0.4)' : 'rgba(237, 237, 237, 0.4)' }} className="text-2xl">
							About Page
						</p>
					</div>

					<style jsx>{`
						@keyframes slideInDown {
							from {
								transform: translateY(-100%);
							}
							to {
								transform: translateY(0);
							}
						}

						@keyframes slideOutUp {
							from {
								transform: translateY(0);
							}
							to {
								transform: translateY(-100%);
							}
						}
					`}</style>
				</div>
			)}
		</>
	);
}
