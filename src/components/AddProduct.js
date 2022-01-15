import React, { useState } from 'react';
import { set, ref } from 'firebase/database';
import { uid } from 'uid';

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

		const uuid = uid();

		set(ref(database, 'products/' + uuid), {
			key: uuid,
			id: uuid,
			productName: newProductName,
			description: productDescription,
			prices: [],
			averagePrice: 0,
			quantity: 0,
		});

		alert('New product loaded');
		setNewProductName('');
		setProductDescription('');
	}

	return (
		<section className="add-product display">
			<form onSubmit={submitHandler}>
				<header className="form-header">Add Products</header>
				<div className="form__items">
					<label htmlFor="product-name">Product Name</label>
					<input
						type="text"
						className="product-name"
						id="product-name"
						value={newProductName}
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
						value={productDescription}
						onChange={productDescriptionHandler}
					/>
				</div>
				<button type="button">Add Product</button>
			</form>
		</section>
	);
};

export default AddProduct;
