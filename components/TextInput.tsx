'use client';

type Input = {
	id: string;
	label: string;
	register: any;
	name: string;
	placeholder?: string;
};

const TextInput = (props: Input) => {
	const { id, label, register, name, placeholder = '' } = props;
	return (
		<fieldset className="Fieldset">
			<label className="Label" htmlFor={id}>
				{label}
			</label>
			<input id={id} {...register(name)} placeholder={placeholder} />
		</fieldset>
	);
};

export default TextInput;
