import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>
				<div className="flex flex-col min-h-screen text-gray-800 select-none">
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
