'use client';

import { useState, useEffect } from 'react';

type Theme = 'day' | 'night' | 'sunrise' | 'sunset';

const themeStyles: Record<Theme, { bg: string; text: string; accent: string }> = {
	day: {
		bg: '#f5f5f5',
		text: '#1a1a1a',
		accent: '#3b82f6',
	},
	night: {
		bg: '#0a0a0a',
		text: '#ededed',
		accent: '#60a5fa',
	},
	sunrise: {
		bg: '#fef3c7',
		text: '#78350f',
		accent: '#f59e0b',
	},
	sunset: {
		bg: '#1f2937',
		text: '#f3f4f6',
		accent: '#ec4899',
	},
};

export function useTheme() {
	const [theme, setThemeState] = useState<Theme>('night');
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		const stored = localStorage.getItem('gallery-theme') as Theme;
		if (stored && stored in themeStyles) {
			setThemeState(stored);
			applyTheme(stored);
		} else {
			applyTheme('night');
		}
	}, []);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		localStorage.setItem('gallery-theme', newTheme);
		applyTheme(newTheme);
	};

	const applyTheme = (t: Theme) => {
		const styles = themeStyles[t];
		document.documentElement.style.setProperty('--bg-primary', styles.bg);
		document.documentElement.style.setProperty('--text-primary', styles.text);
		document.documentElement.style.setProperty('--accent', styles.accent);
		document.body.style.backgroundColor = styles.bg;
		document.body.style.color = styles.text;
	};

	return { theme: isMounted ? theme : 'night', setTheme };
}
