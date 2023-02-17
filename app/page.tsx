import supabase from '@/utils/supabase';
import BlurImage from '@/components/BlurImage';
import DialogDemo from '@/components/Dialog';
import NoVision from '@/components/NoVision';

export type Image = {
	id: number;
	create_at: string;
	name: string;
	href: string;
	username: string;
	imageSrc: string;
};

const Gallery = async () => {
	const { data: images } = await supabase
		.from('images')
		.select('*')
		.order('id', { ascending: true });

	if (!images) {
		return <NoVision />;
	}

	return (
		<section className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
			<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
				<DialogDemo />
				{images && images.map((image) => <BlurImage key={image.id} {...image} />)}
			</div>
		</section>
	);
};

export default Gallery;
