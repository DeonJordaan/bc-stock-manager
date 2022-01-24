import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import database from './firebase';
import Product from '../types/product.js';

type ProductContextObject = {
	products: Product[] | undefined;
};

const ProductContext = React.createContext<ProductContextObject>({
	products: [],
});

export const ProductContextProvider: React.FC = (props) => {
	const [products, setProducts] = useState<Product[]>();

	// Extract products from database on render
	useEffect(() => {
		onValue(ref(database), (snapshot) => {
			setProducts([]);
			const dbProducts = snapshot.val();

			const products: Product[] = dbProducts.products;

			const loadedProducts: Product[] = [];

			// Push products to array
			if (products) {
				Object.values(products).map((item) => {
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
