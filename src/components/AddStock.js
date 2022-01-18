import React, { useContext } from 'react';
import { ref, update } from 'firebase/database';
import database from '../store/firebase';
import ProductContext from '../store/product-context';
import useInput from '../hooks/useInput';
import classes from './AddStock.module.css';
import Dropdown from '../UI/Dropdown';

const AddStock = () => {
	// Extract context values
	const productCtx = useContext(ProductContext);

	// Gather user input via useInput hook
	const {
		value: productName,
		isValid: productNameIsValid,
		valueChangeHandler: productNameChangeHandler,
		reset: resetProductNameInput,
	} = useInput((value) => value.trim() !== '');
	const {
		value: enteredQuantity,
		isValid: quantityIsValid,
		hasError: quantityHasError,
		valueChangeHandler: quantityChangeHandler,
		inputBlurHandler: quantityBlurHandler,
		reset: resetQuantityInput,
	} = useInput((value) => parseInt(value, 10) > 0);
	const {
		value: enteredPrice,
		isValid: priceIsValid,
		hasError: priceHasError,
		valueChangeHandler: priceChangeHandler,
		inputBlurHandler: priceBlurHandler,
		reset: resetPriceInput,
	} = useInput((value) => parseInt(value, 10) > 0);

	// Set form validity
	let formIsValid = false;

	if (productNameIsValid && quantityIsValid && priceIsValid) {
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
			quantity: +enteredQuantity,
			price: +enteredPrice,
		};

		addProductHandler(product);

		// Reset inputs
		resetProductNameInput('');
		resetQuantityInput('');
		resetPriceInput('');
	}

	// Add Stock function
	const addProductHandler = (product) => {
		// Select product from state
		const thisProduct = productCtx.products.find(
			(element) => element.productName === product.name
		);

		// Update product prices array
		const price = product.price;

		if (thisProduct.prices) {
			thisProduct.prices.push(price);
		} else {
			thisProduct.prices = [price];
		}

		// Calculate average price
		const sumOfPrices = thisProduct.prices.reduce(
			(sum, price) => sum + price,
			0
		);
		const newAveragePrice = sumOfPrices / thisProduct.prices.length;

		// Update product quantity
		const newQuantity = thisProduct.quantity + product.quantity;

		// Update product in database
		const productKey = thisProduct.id;

		update(ref(database, `/products/${productKey}`), {
			quantity: newQuantity,
			prices: thisProduct.prices,
			averagePrice: newAveragePrice.toFixed(2),
		});

		// Alert user of success
		alert('New stock added!');
	};

	// Set input classes
	const quantityInputClasses = quantityHasError
		? 'form__items invalid'
		: 'form__items';
	const priceInputClasses = priceHasError
		? 'form__item-price invalid'
		: 'form__item-price';

	return (
		<section className={`${classes['add-stock']} ${classes.display}`}>
			<form onSubmit={submitHandler}>
				<header className="form-header">Add Stock</header>
				<div className="form__select-product">
					<Dropdown
						name={product}
						value={productName || ''}
						onChange={productNameChangeHandler}
					/>
				</div>
				<div className={quantityInputClasses}>
					<label htmlFor="items-received">Items Received</label>
					<input
						type="number"
						className="items-received"
						id="items-received"
						value={enteredQuantity || ''}
						onBlur={quantityBlurHandler}
						onChange={quantityChangeHandler}
					/>
					{quantityHasError && (
						<p className="error-text">Please enter a quantity.</p>
					)}
				</div>
				<div className={priceInputClasses}>
					<label htmlFor="item-price">Price per Item Received</label>
					<input
						type="number"
						className="item-price"
						id="item-price"
						value={enteredPrice || ''}
						onBlur={priceBlurHandler}
						onChange={priceChangeHandler}
					/>
					{priceHasError && (
						<p className="error-text">Please enter a price.</p>
					)}
				</div>
				<button type="submit">Add Stock</button>
			</form>
		</section>
	);
};

export default AddStock;
