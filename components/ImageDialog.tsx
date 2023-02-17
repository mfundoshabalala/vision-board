'use client';
import Image from "next/image";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import ImageInput from './ImageInput';
import SelectInput from './SelectInput';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type Inputs = {
	category: string;
	title: string;
	description: string;
};

const ImageDialog = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		// return data;
	};
	return (
        <Dialog.Root>
			<Dialog.Trigger asChild>
				<div className="group">
					<div className="w-full overflow-hidden bg-gray-200 border-2 border-purple-300 rounded-lg aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
						<Image
                            src="/add-icon.png"
                            alt="add image"
                            className="cursor-pointer opacity-30"
                            fill
                            sizes="100vw"
                            style={{
                                objectFit: "cover"
                            }} />
					</div>
				</div>
				``
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="DialogOverlay" />
				<Dialog.Content className="DialogContent">
					<Dialog.Title className="DialogTitle">Upload image</Dialog.Title>
					<Dialog.Description className="DialogDescription">
						Add your vision to the board. Click save when you are done.
					</Dialog.Description>
					<form onSubmit={handleSubmit(onSubmit)}>
						<SelectInput label="category" {...register('category')} />
						<fieldset className="Fieldset">
							<label className="Label" htmlFor="title">
								Title
							</label>
							<input className="Input" {...register('title')} />
						</fieldset>
						<fieldset className="Fieldset">
							<label className="Label" htmlFor="description">
								Description
							</label>
							<input className="Input" {...register('description')} />
						</fieldset>
						<ImageInput />
						<div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
							<Dialog.Close asChild>
								<button
									type="submit"
									className="text-white Button bg-gradient-to-r from-purple-700 to-purple-900">
									Save changes
								</button>
							</Dialog.Close>
						</div>
					</form>
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

export default ImageDialog;
