import { ref, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import database from './firebase.js';

const ProductContext = React.createContext({
	products: [],
});

export const ProductContextProvider = (props) => {
	const [products, setProducts] = useState();

	// Extract products from database on render
	useEffect(() => {
		onValue(ref(database), (snapshot) => {
			setProducts([]);
			const dbProducts = snapshot.val();

			const loadedProducts = [];

			// Push products to array
			if (dbProducts) {
				Object.values(dbProducts.products).map((item) => {
					loadedProducts.push(item);
					return loadedProducts;
				});
			}

			// Sort products alphabetically
			loadedProducts.sort((a, b) =>
				a.productName > b.productName ? 1 : -1
			);

			// Set sorted products array to state
			setProducts(loadedProducts);
		});
	}, []);

	return (
		<ProductContext.Provider
			value={{
				products: products,
			}}
		>
			{props.children}
		</ProductContext.Provider>
	);
};

export default ProductContext;
