import { ref, onValue } from 'firebase/database';
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

// const loadedProducts = dbProducts.products;

// .map((product) => {
// 	return {
// 		id: product.key,
// 		// products[key].productName,
// 		productName: product.productName,
// 		// products[key].price,
// 		price: product.price,
// 		// products[key].prices,
// 		prices: product.prices,
// 		// products[key].averagePrice,
// 		averagePrice: product.averagePrice,
// 		// products[key].quantity,
// 		quantity: product.quantity,
// 		// products[key].description
// 		description: product.description,
// 	};
// });

//FIXME CHANGE TRANSFORMATION OF DATA FOR NEW DB FORMAT

// for (const key in products) {
// 	console.log(products[key].productName);

// 	loadedProducts.push({
// 		// const product = new Product(
// 		// key,
// 		id: dbProducts.key,
// 		// products[key].productName,
// 		productName: dbProducts[key].productName,
// 		// products[key].price,
// 		price: dbProducts[key].price,
// 		// products[key].prices,
// 		prices: dbProducts[key].prices,
// 		// products[key].averagePrice,
// 		averagePrice: dbProducts[key].averagePrice,
// 		// products[key].quantity,
// 		quantity: dbProducts[key].quantity,
// 		// products[key].description
// 		description: dbProducts[key].description,
// 		// );
// 	});

// setProducts(loadedProducts);
// console.log(loadedProducts);
// const data = snapshot.val();
// if(data) {
// 	Object.values(data).map((product)=>{
// 		setProducts(oldProducts)=>[...oldProducts, ]
// 	})
