import React, { useContext } from 'react';

import ProductContext from '../store/product-context';

const AddStock = () => {
	// const productCtx = useContext(ProductContext);

	return (
		<section className="add-stock display">
			<form>
				<header className="form-header">Add Stock</header>
				<div className="form__select-product">
					<label htmlFor="product-code">Select a Product Code</label>
					<select
						name="product-code"
						id="product-code"
						className="select-product"
					>
						<option value="Select">--Select--</option>
						<option value="product1">Product 1</option>
						<option value="product2">Product 2</option>
						<option value="product3">Product 3</option>
					</select>
				</div>
				<div className="form__items">
					<label htmlFor="items-received">Items Received</label>
					<input
						type="number"
						className="items-received"
						id="items-received"
					/>
				</div>
				<div className="form__item-price">
					<label htmlFor="item-price">Price per Item Received</label>
					<input
						type="number"
						className="item-price"
						id="item-price"
					/>
				</div>
				<button onClick={productCtx.fetchProductsHandler} type="button">
					Add Stock
				</button>
			</form>
		</section>
	);
};

export default AddStock;
