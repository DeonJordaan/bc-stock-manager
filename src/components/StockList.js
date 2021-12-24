// import React, { useState, useCallback, useEffect } from 'react';
import React, { useContext } from 'react';

import StockItem from './StockItem';

import ProductContext from '../store/product-context';

const StockList = () => {
	const productCtx = useContext(ProductContext);
	// console.log(productCtx.products);
	// console.log(productCtx);

	// const [products, setProducts] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);

	// const fetchProductsHandler = useCallback(async () => {
	// 	setIsLoading(true);
	// 	setError(null);
	// 	try {
	// 		const response = await fetch(
	// 			'https://stock-manager-fa27c-default-rtdb.europe-west1.firebasedatabase.app/products.json'
	// 		);
	// 		if (!response.ok) {
	// 			throw new Error('Something went wrong!');
	// 		}

	// 		const products = await response.json();
	// 		console.log(products);

	// 		const loadedProducts = [];
	// 		for (const key in products) {
	// 			loadedProducts.push({
	// 				id: key,
	// 				product: products[key].product,
	// 				price: products[key].price,
	// 				prices: products[key].prices,
	// 				averagePrice: products[key].averagePrice,
	// 				quantity: products[key].quantity,
	// 				description: products[key].description,
	// 			});
	// 		}

	// 		setProducts(loadedProducts);
	// 		console.log(loadedProducts);
	// 	} catch (error) {
	// 		setError(error.message);
	// 	}
	// 	setIsLoading(false);
	// }, []);

	// console.log(products);

	// useEffect(() => {
	// 	fetchProductsHandler();
	// }, [fetchProductsHandler]);

	let stockContent = <div>No products available</div>;

	if (productCtx.products.length > 0) {
		stockContent = (
			<ul id="stock-list">
				{productCtx.products.map((product) => (
					<StockItem
						product={product.product}
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

	return (
		<section className="stock-levels display product">
			<header className="form-header">Where are my Stock Levels?</header>
			<>{stockContent}</>
			{/* <StockItem /> */}
		</section>
	);
};

export default StockList;
