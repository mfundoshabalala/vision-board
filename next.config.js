/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['bit.ly', 'images.unsplash.com', 'www.freeiconspng.com'],
	},
};

module.exports = nextConfig;
