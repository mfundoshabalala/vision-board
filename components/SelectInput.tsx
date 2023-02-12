'use client';
import React from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types';

interface Category {
	category: string;
}

const SelectInput = React.forwardRef<
	HTMLSelectElement,
	{ label: string } & ReturnType<UseFormRegister<Category>>
>(({ onChange, onBlur, name, label }, ref) => {
	return (
		<fieldset className="Fieldset">
			<label htmlFor="category" className="Label">
				{label}
			</label>
			<select
				ref={ref}
				onChange={onChange}
				onBlur={onBlur}
				id="category"
				name={name}
				className="Input">
				<option>United States</option>
				<option>Canada</option>
				<option>Mexico</option>
			</select>
		</fieldset>
	);
});

SelectInput.displayName = 'SelectInput';

export default SelectInput;
