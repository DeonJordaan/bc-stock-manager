import React from 'react';
import { set, ref } from 'firebase/database';
import { uid } from 'uid';
import database from '../store/firebase.js';
import useInput from '../hooks/useInput.js';

const AddProduct = () => {
	const {
		value: productName,
		isValid: productNameIsValid,
		hasError: productNameHasError,
		valueChangeHandler: productNameChangeHandler,
		inputBlurHandler: productNameBlurHandler,
		reset: resetProductNameInput,
	} = useInput((value) => value.trim() !== '');
	const {
		value: description,
		isValid: descriptionIsValid,
		hasError: descriptionHasError,
		valueChangeHandler: descriptionChangeHandler,
		inputBlurHandler: descriptionBlurHandler,
		reset: resetDescriptionInput,
	} = useInput((value) => value.trim() !== '');

	let formIsValid = false;

	if (productNameIsValid && descriptionIsValid) {
		formIsValid = true;
	}

	function submitHandler(event) {
		event.preventDefault();

		if (!formIsValid) {
			alert('Please enter a valid input');
			return;
		}

		const uuid = uid();

		set(ref(database, 'products/' + uuid), {
			key: uuid,
			id: uuid,
			productName,
			description,
			prices: [],
			averagePrice: 0,
			quantity: 0,
		});

		alert('New product loaded');
		resetProductNameInput('');
		resetDescriptionInput('');
	}

	const productNameInputClasses = productNameHasError
		? 'form__product-name invalid'
		: 'form__product-name';
	const descriptionInputClasses = descriptionHasError
		? 'form__description invalid'
		: 'form__description';

	return (
		<section className="add-product display">
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
							Please enter a valid product name.
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
							Please enter a valid product description.
						</p>
					)}
				</div>
				<button type="submit">Add Product</button>
			</form>
		</section>
	);
};

export default AddProduct;
