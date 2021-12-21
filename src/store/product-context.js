import React, { useState, useEffect } from 'react';

import useFetch from './useFetch.js';

const ProductContext = React.createContext({
	products: [],
	isLoading: false,
	error: null,
	// fetchProductsHandler: () => {},
});

export const ProductContextProvider = (props) => {
	const [products, setProducts] = useState([]);

	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);

	const { isLoading, error, sendRequest: fetchProducts } = useFetch();

	useEffect(() => {
		const transformData = (productData) => {
			const products = productData;

			const loadedProducts = [];

			for (const key in products) {
				loadedProducts.push({
					id: key,
					product: products[key].product,
					price: products[key].price,
					prices: products[key].prices,
					averagePrice: products[key].averagePrice,
					quantity: products[key].quantity,
					description: products[key].description,
				});
			}

			//NOTE
			// const allProducts = products.map((data) => new Product(data));
			// const allProducts = products.map((data) => {
			// 	return {
			// 		product: data.product,
			// 		description: data.description,
			// 		price: data.price,
			// 		quantity: data.quantity,
			// 		averagePrice: data.averagePrice,
			// 		prices: data.prices,
			// 	};
			// });
			//NOTE

			setProducts(loadedProducts);
		};

		fetchProducts(
			{
				url: 'https://stock-manager-fa27c-default-rtdb.europe-west1.firebasedatabase.app/products.json',
			},
			transformData
		);
	}, [fetchProducts]);

	// NOTE EXCLUDING USEFETCH HOOK
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
	// 		console.log(loadedProducts);
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
	// 	} catch (error) {
	// 		setError(error.message);
	// 	}
	// 	setIsLoading(false);
	// }, []);

	// useEffect(() => {
	// 	fetchProductsHandler();
	// }, [fetchProductsHandler]);

	return (
		<ProductContext.Provider
			value={{
				products: products,
				isLoading: isLoading,
				error: error,
				// fetchProductsHandler: fetchProductsHandler,
			}}
		>
			{props.children}
		</ProductContext.Provider>
	);
};

export default ProductContext;
