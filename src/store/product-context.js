import React, { useState, useFetch, useEffect } from 'react';

const ProductContext = React.createContext({
	products: [],
	isLoading: false,
	error: null,
});

export const ProductContextProvider = (props) => {
	const [products, setProducts] = useState([]);

	const { isLoading, error, sendRequest: fetchProducts } = useFetch();

	useEffect(() => {
		const transformData = (productData) => {
			const { products } = productData;

			// const allProducts = products.map((data) => new Product(data));
			const allProducts = products.map((data) => {
				return {
					product: data.product,
					description: data.description,
					price: data.price,
					quantity: data.quantity,
					averagePrice: data.averagePrice,
					prices: data.prices,
				};
			});
			setProducts(allProducts);
		};
		fetchProducts(
			{
				url: 'https://stock-manager-fa27c-default-rtdb.europe-west1.firebasedatabase.app/products.json',
			},
			transformData
		);
	}, [fetchProducts]);

	return (
		<ProductContext.Provider
			value={{ products: products, isLoading: isLoading, error: error }}
		>
			{props.children}
		</ProductContext.Provider>
	);
};

export default ProductContext;
