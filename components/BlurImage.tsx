'use client';
import Image from 'next/image';
import { useState } from 'react';

type BlurImage = {
	id: number;
	create_at: string;
	name: string;
	href: string;
	username: string;
	imageSrc: string;
};

export function cn(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export function BlurImage(image: BlurImage) {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<a href={image.href} className="group">
			<div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
				<Image
					src={image.imageSrc}
					alt={image.name}
					className={cn(
						'group-hover:opacity-75 duration-700 ease-in-out',
						isLoading
							? 'grayscale blur-2xl scale-110'
							: 'grayscale-0 blur-0 scale-100'
					)}
					layout="fill"
					objectFit="cover"
					onLoadingComplete={() => setIsLoading(false)}
				/>
			</div>
			<h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
			<p className="mt-1 text-sm text-gray-500">@{image.username}</p>
		</a>
	);
}
