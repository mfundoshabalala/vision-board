import Header from '@/components/Header';
import ImportImageDialog from '@/components/ImageDialog';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head />
			<body>
				<div className="flex flex-col min-h-screen ">
					<Header />
					<main className="flex-1">{children}</main>
					<footer>Footer</footer>
				</div>
			</body>
		</html>
	);
}
