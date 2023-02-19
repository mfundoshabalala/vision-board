import supabase from './supabase';

export const getCategoryByName: (categoryName: string) => Promise<any | null> = async (
	categoryName
) => {
	const { data } = await supabase.from('categories').select().eq('name', categoryName);
	if (data && data.length > 0) {
		return data[0];
	}
	return null;
};

export const getCategories: () => Promise<string[]> = async () => {
	const { data } = await supabase.from('categories').select();
	if (data && data.length > 0) {
		return data.map((category) => category.name);
	}
	return [];
};

export const createCategory: (categoryName: string) => Promise<number | null> = async (
	categoryName
) => {
	const { data } = await supabase.from('categories').insert({ name: categoryName }).select();
	if (data && data.length > 0) {
		return data[0].id;
	}
	return null;
};

export const createVision: (vision: any, categoryId: number) => Promise<any | null> = async (
	vision,
	categoryId
) => {
	const { title, description } = vision;
	const { data, error } = await supabase
		.from('visions')
		.insert({ board_id:1, title, description, category_id:categoryId })
		.select();
	if (error) {
		console.log(error);
		return null;
	}
	return data[0];
};

export const getVisionByTitle = async (title: string) => {
	const { data, error } = await supabase.from('visions').select().eq('title', title);
	if (error) {
		console.log(error);
		return null;
	}
	return data[0];
};

export const getVisions = async () => {
	const { data, error } = await supabase.from('visions').select();
	if (error) {
		console.log(error);
		return [];
	}
	return data;
};

export const getVisionById = async (id: number) => {
	const { data, error } = await supabase.from('visions').select().eq('id', id);
	if (error) {
		console.log(error);
		return null;
	}
	return data[0];
};

export const getVisionByCategoryId = async (categoryId: number) => {
	const { data, error } = await supabase.from('visions').select().eq('category_id', categoryId);
	if (error) {
		console.log(error);
		return [];
	}
	return data;
};

export const storeImage: (image: File) => Promise<string | null> = async (image) => {
	const { data, error } = await supabase.storage
		.from('images')
		.upload('public/' + image.name, image, {
			cacheControl: '3600',
			upsert: true,
			contentType: image.type,
		});
	if (error) {
		console.log(error);
		return null;
	}
	return data.path;
};

export const updateVisionWithImageUrl: (
	path: string,
	visionId: number
) => Promise<boolean> = async (path, visionId) => {
	const { data, error } = await supabase
		.from('visions')
		.update({ image_url: path })
		.eq('id', visionId);
	if (error) {
		console.log(error);
		return false;
	}
	return true;
};
