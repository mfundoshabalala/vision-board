import React from 'react';

const Footer = () => {
	return (
		<footer className="flex justify-center items-center px-6 py-4 bg-gray-50 text-sm shadow text-gray-800">
			<div className="">
				Created using{' '}
				<a target="_blank" href="">
					Next.js
				</a>
				,{' '}
				<a target="_blank" href="">
					TailwindCSS
				</a>{' '}
				and{' '}
				<a target="_blank" href="">
					Supabase
				</a>
				.
			</div>
		</footer>
	);
};

export default Footer;
