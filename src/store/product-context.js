import React, { useState, useEffect, useCallback } from 'react';

import useFetch from './useFetch.js';

const ProductContext = React.createContext({
	products: [],
	isLoading: false,
	error: null,
	fetchProductsHandler: () => {},
	addProductHandler: () => {},
});

export const ProductContextProvider = (props) => {
	const [products, setProducts] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState(null);
	//FIXME TRYING USEFETCH HOOK
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

			setProducts(loadedProducts);
		};

		fetchProducts(
			{
				url: 'https://stock-manager-fa27c-default-rtdb.europe-west1.firebasedatabase.app/products.json',
			},
			transformData
		);
	}, [fetchProducts]);

	//NOTE ADD PRODUCTS FUNCTION
	const addProductHandler = useCallback(async (product) => {
		//TODO ADD QUANTITY TO CURRENT PRODUCT QUANTITY

		//TODO ADD THE LATEST PRICE TO THE PRICES ARRAY

		//TODO RECALCULATE AVERAGE PRICE WHEN NEW PRODUCT ADDED

		//FIXME DO I NEED TO MAKE A FETCH REQUEST EVERY TIME THE ITEM GETS ADDED AND THE ABOVE TODO'S ARE CALCULATED? CAN IT BE DONE IN THE SAME REQUEST?

		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				'https://stock-manager-fa27c-default-rtdb.europe-west1.firebasedatabase.app/products.json',
				{
					method: 'POST',
					body: JSON.stringify(product),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log(data);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchProductsHandler();
	}, [fetchProductsHandler, addProductHandler]);

	return (
		<ProductContext.Provider
			value={{
				products: products,
				isLoading: isLoading,
				error: error,
				fetchProductsHandler: fetchProductsHandler,
				addProductHandler: addProductHandler,
			}}
		>
			{props.children}
		</ProductContext.Provider>
	);
};

export default ProductContext;

//NOTE
// const [products, setProducts] = useState([]);
// const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(null);

// // NOTE EXCLUDING USEFETCH HOOK
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

// NOTE;
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
// NOTE;
