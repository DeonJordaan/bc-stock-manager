import React, { useContext } from 'react';
import { set, ref } from 'firebase/database';
import { uid } from 'uid';
import database from '../store/firebase.jsx';
import ProductContext from '../store/product-context';
import useInput from '../hooks/useInput.js';
import classes from './AddProduct.module.css';
import Product from '../interfaces/product.js';

const AddProduct: React.FC = () => {
	// Extract context values
	const productCtx = useContext(ProductContext);
	const products: Product[] = productCtx.products;

	// Gather user input via useInput hook
	const {
		value: productName,
		isValid: productNameIsValid,
		hasError: productNameHasError,
		valueChangeHandler: productNameChangeHandler,
		inputBlurHandler: productNameBlurHandler,
		reset: resetProductNameInput,
	} = useInput((value: string) => value.trim() !== '');
	const {
		value: description,
		isValid: descriptionIsValid,
		hasError: descriptionHasError,
		valueChangeHandler: descriptionChangeHandler,
		inputBlurHandler: descriptionBlurHandler,
		reset: resetDescriptionInput,
	} = useInput((value: string) => value.trim() !== '');

	// Set form validity
	let formIsValid = false;

	if (productNameIsValid && descriptionIsValid) {
		formIsValid = true;
	}

	// Extract existing product names
	let productNames: string[] = [];

	if (products) {
		for (const product of products) {
			productNames.push(product.productName);
		}
	}

	// Form submit function
	function submitHandler(event: React.FormEvent) {
		event.preventDefault();

		if (!formIsValid) {
			alert('Please enter a valid input');
			return;
		}

		// Check if product already exists on database
		const productNameUpperCase = productName!.toUpperCase();

		if (productNames.includes(productNameUpperCase)) {
			alert('Product already exists. Please choose another product name');
			return;
		}

		// Add new product to database
		const uuid: string = uid();

		set(ref(database, 'products/' + uuid), {
			key: uuid,
			id: uuid,
			productName: productNameUpperCase,
			description,
			prices: [],
			averagePrice: 0,
			quantity: 0,
		});

		// Alert user of success and reset inputs
		alert('New product added');
		resetProductNameInput();
		resetDescriptionInput();
	}

	// Set input classes
	const productNameInputClasses = productNameHasError
		? 'form__product-name invalid'
		: 'form__product-name';
	const descriptionInputClasses = descriptionHasError
		? 'form__description invalid'
		: 'form__description';

	return (
		<section className={`${classes['add-product']} ${classes.display}`}>
			<form onSubmit={submitHandler}>
				<header className="form-header">Add Products</header>
				<div className={productNameInputClasses}>
					<label htmlFor="product-name">Product Name</label>
					<input
						type="text"
						className="product-name"
						id="product-name"
						value={productName || ''}
						onBlur={productNameBlurHandler}
						onChange={productNameChangeHandler}
					/>
					{productNameHasError && (
						<p className="error-text">
							Please enter a product name.
						</p>
					)}
				</div>
				<div className={descriptionInputClasses}>
					<label htmlFor="description">Product Description</label>
					<input
						type="text"
						className="description"
						id="description"
						value={description || ''}
						onBlur={descriptionBlurHandler}
						onChange={descriptionChangeHandler}
					/>
					{descriptionHasError && (
						<p className="error-text">
							Please enter a product description.
						</p>
					)}
				</div>
				<button type="submit">Add Product</button>
			</form>
		</section>
	);
};

export default AddProduct;
