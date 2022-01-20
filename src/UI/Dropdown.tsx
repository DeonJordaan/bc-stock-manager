import React, { Fragment, useContext } from 'react';
import ProductContext from '../store/product-context';
import classes from './Dropdown.module.css';

const Dropdown: React.FC<{
	name: string;
	value: string | '';
	onChange: (event: React.FormEvent) => void;
}> = (props) => {
	// Extract context values
	const productCtx = useContext(ProductContext);

	const { products } = productCtx;

	let dropdownMenu;

	if (products) {
		dropdownMenu =
			products?.length > 0 &&
			products.map((item) => (
				<option key={item.id} value={item.productName}>
					{item.productName}
				</option>
			));
	}

	return (
		<Fragment>
			<label htmlFor={props.name}>Select a Product Code</label>
			<select
				name={props.name}
				className={classes.select}
				value={props.value}
				onChange={props.onChange}
			>
				<option value="Select">--Select--</option>
				{/* Render product names to dropdown select options */}
				{dropdownMenu}
			</select>
		</Fragment>
	);
};

export default Dropdown;
