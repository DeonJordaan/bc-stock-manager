import React, { Fragment, useContext } from 'react';
import ProductContext from '../store/product-context';
import classes from './Dropdown.module.css';

const Dropdown = (props) => {
	const productCtx = useContext(ProductContext);

	const { products } = productCtx;

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
				{products?.length > 0 &&
					products.map((item) => (
						<option key={item.id} value={item.productName}>
							{item.productName}
						</option>
					))}
			</select>
		</Fragment>
	);
};

export default Dropdown;
