import React, { useContext } from 'react';
import { ref, update } from 'firebase/database';
import database from '../store/firebase';
import ProductContext from '../store/product-context';
import useInput from '../hooks/useInput';

const AddStock = () => {
	const productCtx = useContext(ProductContext);

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

	let formIsValid = false;

	if (productNameIsValid && quantityIsValid && priceIsValid) {
		formIsValid = true;
	}

	let product = {};

	function submitHandler(event) {
		event.preventDefault();

		if (!formIsValid) {
			alert('Please enter a valid input');
			return;
		}

		product = {
			name: productName.toUpperCase(),
			quantity: +enteredQuantity,
			price: +enteredPrice,
		};

		addProductHandler(product);

		resetProductNameInput('');
		resetQuantityInput('');
		resetPriceInput('');
	}

	const quantityInputClasses = quantityHasError
		? 'form__items invalid'
		: 'form__items';
	const priceInputClasses = priceHasError
		? 'form__item-price invalid'
		: 'form__item-price';

	// Add Stock function
	const addProductHandler = (product) => {
		//Select product to be updated
		const thisProduct = productCtx.products.find(
			(element) => element.productName === product.name
		);

		const price = product.price;

		if (thisProduct.prices) {
			thisProduct.prices.push(price);
		} else {
			thisProduct.prices = [price];
		}

		const sumOfPrices = thisProduct.prices.reduce(
			(sum, price) => sum + price,
			0
		);
		const newAveragePrice = sumOfPrices / thisProduct.prices.length;
		const newQuantity = thisProduct.quantity + product.quantity;
		const productKey = thisProduct.id;

		//Update product in DB
		update(ref(database, `/products/${productKey}`), {
			quantity: newQuantity,
			prices: thisProduct.prices,
			averagePrice: newAveragePrice.toFixed(2),
		});

		alert('New stock added!');
	};

	return (
		<section className="add-stock display">
			<form onSubmit={submitHandler}>
				<header className="form-header">Add Stock</header>
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
						<p className="error-text">
							Please enter a valid quantity.
						</p>
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
						<p className="error-text">
							Please enter a valid price.
						</p>
					)}
				</div>
				<button type="submit">Add Stock</button>
			</form>
		</section>
	);
};

export default AddStock;
