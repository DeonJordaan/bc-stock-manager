import React, { useContext, useState } from 'react';
import { ref, update } from 'firebase/database';
import database from '../store/firebase';
import ProductContext from '../store/product-context';

const AddStock = () => {
	const productCtx = useContext(ProductContext);

	const [productName, setProductName] = useState();
	const [productQuantity, setProductQuantity] = useState();
	const [productPrice, setProductPrice] = useState();

	let product = {};

	const selectDropdownHandler = (event) => {
		setProductName(event.target.value);
	};

	const quantityReceivedHandler = (event) => {
		setProductQuantity(event.target.value);
	};

	const productPriceHandler = (event) => {
		setProductPrice(event.target.value);
	};

	function submitHandler(event) {
		event.preventDefault();

		// could add validation here...

		product = {
			name: productName.toUpperCase(),
			quantity: +productQuantity,
			price: +productPrice,
		};

		addProductHandler(product);
		setProductName('');
		setProductQuantity('');
		setProductPrice('');
	}

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
						onChange={selectDropdownHandler}
					>
						<option value="Select">--Select--</option>
						<option value="product01">Product 1</option>
						<option value="product02">Product 2</option>
						<option value="product03">Product 3</option>
					</select>
				</div>
				<div className="form__items">
					<label htmlFor="items-received">Items Received</label>
					<input
						type="number"
						className="items-received"
						id="items-received"
						value={productQuantity || ''}
						onChange={quantityReceivedHandler}
					/>
				</div>
				<div className="form__item-price">
					<label htmlFor="item-price">Price per Item Received</label>
					<input
						type="number"
						className="item-price"
						id="item-price"
						value={productPrice || ''}
						onChange={productPriceHandler}
					/>
				</div>
				<button type="submit">Add Stock</button>
			</form>
		</section>
	);
};

export default AddStock;
