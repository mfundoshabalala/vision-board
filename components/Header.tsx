import React from 'react';

const Header = () => {
	return (
		<header className="shadow-sm p-6 flex items-center justify-center bg-gray-50">
			<div className="flex flex-col gap-y-2 justify-center items-center text-center">
				<h1 className="font-black text-transparent bg-clip-text text-5xl bg-gradient-to-r from-teal-900 via-sky-900 to-purple-900 drop-shadow-md">
					SBWL
				</h1>
				<p className="text-gray-700 text-sm italic">
					&quot;Vision is the art of seeing what is invisible to others&quot;
				</p>
			</div>
		</header>
	);
};

export default Header;
