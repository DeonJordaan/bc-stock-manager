import React, { useContext } from 'react';
import { update, ref } from 'firebase/database';
import database from '../store/firebase';
import ProductContext from '../store/product-context';
import EmailContext from '../store/email-context';
import useInput from '../hooks/useInput';
import Dropdown from '../UI/Dropdown';
import classes from './RemoveStock.module.css';

const RemoveStock = () => {
	// Extract context values
	const emailCtx = useContext(EmailContext);
	const productCtx = useContext(ProductContext);
	const emailList = emailCtx.emails;

	// Gather user input via useInput hook
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

	// Set form validity
	let formIsValid = false;

	if (productNameIsValid && emailIsValid && quantityIsValid) {
		formIsValid = true;
	}

	let product = {};

	// Form submit function
	function submitHandler(event) {
		event.preventDefault();

		if (!formIsValid) {
			alert('Please enter a valid input');
			return;
		}

		// Assign gathered inputs to product
		product = {
			name: productName.toUpperCase(),
			email: enteredEmail,
			quantity: +enteredQuantity,
		};

		// Check if email has been used
		if (emailCtx.emails?.includes(enteredEmail)) {
			alert('Sorry! Only one purchase per customer allowed');
		} else {
			//If not, continue with purchase
			removeProductHandler(product);
		}

		// Reset inputs
		resetProductNameInput();
		resetEmailInput();
		resetQuantityInput();
	}

	// Subtract the items from the database
	const removeProductHandler = () => {
		// Select product from state
		const thisProduct = productCtx.products.find(
			(element) => element.productName === product.name
		);

		// eslint-disable-next-line no-unused-vars
		const updatedEmails = emailCtx.emails.push(enteredEmail);
		const updatedQuantity = thisProduct.quantity - product.quantity;
		const productKey = thisProduct.id;

		// Update product in database
		update(ref(database, `/products/${productKey}`), {
			quantity: updatedQuantity,
		});

		// Update email list in database
		update(ref(database, `/`), {
			emailList,
		});

		// Alert user of success
		alert('Purchase successfull');
	};

	// Set input classes
	const emailInputClasses = emailHasError
		? 'form__buyer-email invalid'
		: 'form__buyer-email';
	const quantityInputClasses = quantityHasError
		? 'form__items-bought invalid'
		: 'form__items-bought';

	return (
		<section className={`${classes['remove-stock']} ${classes.display}`}>
			<form onSubmit={submitHandler}>
				<header className="form-header">Remove Stock</header>
				<div className="form__select-product">
					<Dropdown
						name={product}
						value={productName || ''}
						onChange={productNameChangeHandler}
					/>
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
							Please enter an email address.
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
						<p className="error-text">Please enter a quantity.</p>
					)}
				</div>
				<button type="submit">Item Shipped</button>
			</form>
		</section>
	);
};

export default RemoveStock;
