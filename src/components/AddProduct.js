import React, { useState } from 'react';
import { set, ref } from 'firebase/database';

import database from '../store/firebase.js';

const AddProduct = () => {
	const [newProductName, setNewProductName] = useState();
	const [productDescription, setProductDescription] = useState();

	const productNameHandler = (event) => {
		setNewProductName(event.target.value);
	};

	const productDescriptionHandler = (event) => {
		setProductDescription(event.target.value);
	};

	function submitHandler(event) {
		event.preventDefault();

		set(ref(database, 'products/' + newProductName), {
			productName: newProductName,
			description: productDescription,
		});

		// database.ref('products/' + newProductName).set({
		// 	productName: newProductName,
		// 	description: productDescription,
		// });
		alert('New product loaded');
	}

	return (
		<section className="add-product display">
			<form>
				<header className="form-header">Add Products</header>
				<div className="form__items">
					<label htmlFor="product-name">Product Name</label>
					<input
						type="text"
						className="product-name"
						id="product-name"
						onChange={productNameHandler}
					/>
				</div>
				<div className="form__item-price">
					<label htmlFor="product-description">
						Product Description
					</label>
					<input
						type="text"
						className="product-description"
						id="product-description"
						onChange={productDescriptionHandler}
					/>
				</div>
				{/* <button type="button"> */}
				<button onClick={submitHandler} type="button">
					Add Product
				</button>
			</form>
		</section>
	);
};

export default AddProduct;
