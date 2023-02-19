'use client';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { useForm } from 'react-hook-form';
import supabase from '@/utils/supabase';
import { createCategory, createVision, getCategoryByName, storeImage, updateVisionWithImageUrl } from '@/utils/database';

type VisionProps = {
	board_id?: number;
	title: string;
	description: string;
	category_id: number;
	// image: string;
};

const DialogDemo = () => {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<button className="Button violet">Add vision</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="DialogOverlay" />
				<Dialog.Content className="DialogContent">
					<Dialog.Title className="DialogTitle">Add vision</Dialog.Title>
					<Dialog.Description className="DialogDescription">
						Add a vision to your vision board here. Click save when you&apos;re done.
					</Dialog.Description>
					<ImageForm />
					<Dialog.Close asChild>
						<button className="IconButton" aria-label="Close">
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default DialogDemo;

const ImageForm = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = async (props: any) => {
		const { title, description, category: categoryName, image } = props;
		let categoryId: number | null = null;
		let visionId: number | null = null;
		let image_url: string | null = null;
		// get vision category
		const categoryData = await getCategoryByName(categoryName);
		categoryId = categoryData ? categoryData.id : await createCategory(categoryName);
		// add vision
		if (categoryId) {
			const visionData = await createVision(props, categoryId);
			visionId = visionData?.id;
			// store image to bucket
			image_url = await storeImage(image[0]);
		}
		// add image to vision
		if (categoryId && visionId && image_url) {
			const data =  await updateVisionWithImageUrl(image_url, visionId);
			console.log(data);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<fieldset className="Fieldset">
				<label className="Label" htmlFor="title">
					Title
				</label>
				<input className="Input" {...register('title')} defaultValue="title 1" />
			</fieldset>
			<fieldset className="Fieldset">
				<label className="Label" htmlFor="description">
					Description
				</label>
				<input className="Input" {...register('description')} defaultValue="desc 1" />
			</fieldset>
			<fieldset className="Fieldset">
				<label className="Label" htmlFor="category">
					Category
				</label>
				<select className="Input" {...register('category')}>
					<option>Family</option>
					<option>Work</option>
					<option>Friends</option>
					<option>Other</option>
				</select>
			</fieldset>
			<fieldset className="Fieldset">
				<label className="Label">Image</label>
				<div className="flex justify-center flex-1 px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
					<div className="space-y-1 text-center">
						<svg
							className="w-12 h-12 mx-auto text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
							aria-hidden="true">
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className="flex text-sm text-gray-600">
							<label
								htmlFor="file-upload"
								className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
								<span>Upload a file</span>
								<input
									id="file-upload"
									type="file"
									className="sr-only"
									accept="image/*"
									{...register('image')}
								/>
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
					</div>
				</div>
			</fieldset>
			<div className="flex justify-end mt-5">
				<button
					type="submit"
					className="bg-gradient-to-r from-green-600 to-green-800 px-4 py-1.5 rounded text-white shadow">
					Save changes
				</button>
			</div>
		</form>
	);
};
