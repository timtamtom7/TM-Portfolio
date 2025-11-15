'use client';

import { useState } from 'react';
import InfiniteGallery from '@/components/InfiniteGallery';
import IconHeader from '@/components/IconHeader';
import ImageDetail from '@/components/ImageDetail';
import ShowcasePage from '@/components/ShowcasePage';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export default function Home() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [showShowcase, setShowShowcase] = useState(false);
	const [showAbout, setShowAbout] = useState(false);
	const { theme } = useTheme();

	const sampleImages = [
		{ src: '/1.webp', alt: 'Image 1' },
		{ src: '/2.webp', alt: 'Image 2' },
		{ src: '/3.webp', alt: 'Image 3' },
		{ src: '/4.webp', alt: 'Image 4' },
		{ src: '/5.webp', alt: 'Image 5' },
		{ src: '/6.webp', alt: 'Image 6' },
		{ src: '/7.webp', alt: 'Image 7' },
		{ src: '/8.webp', alt: 'Image 8' },
	];

	if (showShowcase) {
		return (
			<ShowcasePage onBack={() => setShowShowcase(false)} />
		);
	}

	return (
		<main className="min-h-screen">
			<IconHeader onShowAbout={(show) => setShowAbout(show)} />
			<InfiniteGallery
				images={sampleImages}
				speed={1.2}
				zSpacing={3}
				visibleCount={12}
				falloff={{ near: 0.8, far: 14 }}
				className="h-screen w-full rounded-lg overflow-hidden"
				onImageHeld={setSelectedImage}
			/>
			<div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
				<h1 className="font-serif text-4xl md:text-7xl tracking-tight">
					<span className="italic">I create;</span> therefore I am
				</h1>
			</div>

			<button
				onClick={() => setShowShowcase(true)}
				className="fixed bottom-8 right-8 z-30 flex items-center gap-2 transition-all duration-300 hover:opacity-70"
				style={{
					color: theme === 'day' || theme === 'sunrise' ? 'rgba(30, 30, 30, 1)' : 'rgba(220, 220, 220, 1)',
					fontSize: '14px',
					fontWeight: '300',
					borderBottom: `1px solid ${theme === 'day' || theme === 'sunrise' ? 'rgba(30, 30, 30, 0.8)' : 'rgba(220, 220, 220, 0.6)'}`,
					paddingBottom: '2px',
				}}
			>
				enter showcase
				<ArrowRight size={14} />
			</button>

			{selectedImage && (
				<ImageDetail
					imageSrc={selectedImage}
					onClose={() => setSelectedImage(null)}
					onShowcaseClick={() => setShowShowcase(true)}
				/>
			)}
		</main>
	);
}
