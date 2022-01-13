// import React, { useState, useCallback, useEffect } from 'react';
import React, { useContext } from 'react';

import StockItem from './StockItem';

import ProductContext from '../store/product-context';

const StockList = () => {
	const productCtx = useContext(ProductContext);

	let stockContent = <div>No products available</div>;

	if (productCtx.products.length > 0) {
		stockContent = (
			<ul id="stock-list">
				{productCtx.products.map((product) => (
					<StockItem
						name={product.productName}
						quantity={product.quantity}
						averagePrice={product.averagePrice}
					/>
				))}
			</ul>
		);
	}

	if (productCtx.error) {
		stockContent = <p>{productCtx.error}</p>;
	}

	if (productCtx.isLoading) {
		stockContent = <p>Loading...</p>;
	}
	console.log(productCtx.products);

	return (
		<section className="stock-levels display product">
			<header className="form-header">Where are my Stock Levels?</header>
			<>{stockContent}</>
			{/* <StockItem /> */}
		</section>
	);
};

export default StockList;
