import React, { useContext } from 'react';
import { update, ref } from 'firebase/database';
import database from '../store/firebase';
import ProductContext from '../store/product-context';
import EmailContext from '../store/email-context';
import useInput from '../hooks/useInput';

const RemoveStock = () => {
	const emailCtx = useContext(EmailContext);
	const productCtx = useContext(ProductContext);
	const emailList = emailCtx.emails;

	const {
		value: productName,
		isValid: productNameIsValid,
		valueChangeHandler: productNameChangeHandler,
		reset: resetProductNameInput,
	} = useInput((value) => value.trim() !== '');
	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
	} = useInput((value) => value.includes('@'));
	const {
		value: enteredQuantity,
		isValid: quantityIsValid,
		hasError: quantityHasError,
		valueChangeHandler: quantityChangeHandler,
		inputBlurHandler: quantityBlurHandler,
		reset: resetQuantityInput,
	} = useInput((value) => parseInt(value, 10) > 0);

	let formIsValid = false;

	if (productNameIsValid && emailIsValid && quantityIsValid) {
		formIsValid = true;
	}

	let product = {};

	// Process logic
	function submitHandler(event) {
		event.preventDefault();

		if (!formIsValid) {
			alert('Please enter a valid input');
			return;
		}

		product = {
			name: productName.toUpperCase(),
			email: enteredEmail,
			quantity: +enteredQuantity,
		};

		if (emailCtx.emails?.includes(enteredEmail)) {
			alert('Sorry! Only one purchase per customer allowed');
		} else {
			removeProductHandler(product);
		}

		resetProductNameInput();
		resetEmailInput();
		resetQuantityInput();
	}

	const emailInputClasses = emailHasError
		? 'form__buyer-email invalid'
		: 'form__buyer-email';
	const quantityInputClasses = quantityHasError
		? 'form__items-bought invalid'
		: 'form__items-bought';

	// Subtract the items from the database
	const removeProductHandler = () => {
		const thisProduct = productCtx.products.find(
			(element) => element.productName === product.name
		);

		// eslint-disable-next-line no-unused-vars
		const updatedEmails = emailCtx.emails.push(enteredEmail);
		const updatedQuantity = thisProduct.quantity - product.quantity;
		const productKey = thisProduct.id;

		//Update product in DB
		update(ref(database, `/products/${productKey}`), {
			quantity: updatedQuantity,
		});

		update(ref(database, `/`), {
			emailList,
		});

		alert('Purchase successfull');
	};

	return (
		<section className="remove-stock display">
			<form onSubmit={submitHandler}>
				<header className="form-header">Remove Stock</header>
				<div className="form__select-product">
					<label htmlFor="product-code">Select a Product Code</label>
					<select
						name="product-code"
						id="product-code"
						className="select-product"
						value={productName || ''}
						onChange={productNameChangeHandler}
					>
						<option value="Select">--Select--</option>
						<option value="product01">Product 1</option>
						<option value="product02">Product 2</option>
						<option value="product03">Product 3</option>
					</select>
				</div>
				<div className={emailInputClasses}>
					<label htmlFor="buyer-email">Buyer Email Address</label>
					<input
						type="email"
						className="buyer-email"
						id="buyer-email"
						value={enteredEmail || ''}
						onBlur={emailBlurHandler}
						onChange={emailChangeHandler}
					/>
					{emailHasError && (
						<p className="error-text">
							Please enter a valid email address.
						</p>
					)}
				</div>
				<div className={quantityInputClasses}>
					<label htmlFor="items-bought">Items Bought</label>
					<input
						type="number"
						className="items-bought"
						id="items-bought"
						value={enteredQuantity || ''}
						onBlur={quantityBlurHandler}
						onChange={quantityChangeHandler}
					/>
					{quantityHasError && (
						<p className="error-text">
							Please enter a valid quantity.
						</p>
					)}
				</div>
				<button type="submit">Item Shipped</button>
			</form>
		</section>
	);
};

export default RemoveStock;

// Check if the email has been used
// If it has been used, alert the customer and decline the purchase
// If it has not been used, allow the purchase to go ahead and add the email to the DB
