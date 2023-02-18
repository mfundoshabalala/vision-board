'use client';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import { useForm } from 'react-hook-form';
import supabase from '@/utils/supabase';

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

	const getCategoryId: (category: string) => Promise<number | null> = async (category) => {
		const { data } = await supabase.from('categories').select('id').match({ name: category });
		if (data && data.length > 0) {
			return data[0].id;
		}
		return null;
	};

	const createCategory = async (category: string) => {
		const { data, error } = await supabase
			.from('categories')
			.insert({ name: category })
			.select('id');
		if (data) {
			return data[0].id;
		} else if (error) {
			console.log(error);
		} else {
			console.log('no data');
		}
	};

	const createVision: (props: VisionProps) => Promise<void> = async (props: VisionProps) => {
		const { board_id = 1, title, description, category_id } = props;
		await supabase.from('visions').insert({
			board_id: board_id,
			title: title,
			description: description,
			category_id: category_id,
		});
	};

	const updateVisionWithImage = async (vision_id: number, image: File) => {
		const img_path = await insertImageToBucket(image);
		if (img_path) {
			const { data, error } = await supabase
				.from('visions')
				.update({ image: img_path })
				.match({ id: vision_id });
			if (data) {
				console.log(data);
			} else if (error) {
				console.log(error);
			} else {
				console.log('no data');
			}
		}  else {
			console.log('no image data');
		}
	};

	const insertImageToBucket: (image: File) => Promise<any> = async (image: File) => {
		const { data, error } = await supabase.storage
			.from('images')
			.upload('public/' + image.name, image)
		return data?.path;
	};

	const onSubmit = async (props: any) => {
		// properties from the form
		const { title, description, category, image } = props;
		// select a category based on the category name
		const category_id = await getCategoryId(category);
		// insert a new vision
		if (category_id) {
			await createVision({ title, description, category_id });
		}

		const { data, error } = await supabase.storage
			.from('images')
			.upload('public/' + image[0].name, image[0] as File);
		if (data) {
			console.log(data);
		} else if (error) {
			console.log(error);
		} else {
			console.log('no data');
		}
		// await supabase.storage.from('images').upload('test.png', image[0]);
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
