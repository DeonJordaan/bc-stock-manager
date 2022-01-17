import { ref, onValue, query, orderByChild } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import database from './firebase.js';

const ProductContext = React.createContext({
	products: [],
});

export const ProductContextProvider = (props) => {
	const [products, setProducts] = useState();

	useEffect(() => {
		onValue(ref(database), (snapshot) => {
			setProducts([]);
			const dbProducts = snapshot.val();

			const loadedProducts = [];

			if (dbProducts) {
				Object.values(dbProducts.products).map((item) => {
					loadedProducts.push(item);
					return loadedProducts;
				});
			}

			setProducts(loadedProducts);
		});
	}, []);

	useEffect(() => {
		query(ref(database, 'products'), orderByChild('productName')
		
		(snapshot) => {
			setProducts([]);
			const moreProducts = snapshot.val();
			console.log(moreProducts);

			// const loadedProducts = [];

			// if (dbProducts) {
			// 	Object.values(dbProducts.products).map((item) => {
			// 		loadedProducts.push(item);
			// 		return loadedProducts;
			// 	});
			// }

			// setProducts(loadedProducts);
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
