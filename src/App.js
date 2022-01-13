import React from 'react';
import './App.css';
import AddStock from './components/AddStock';
import RemoveStock from './components/RemoveStock';
import StockList from './components/StockList';
import AddProduct from './components/AddProduct';
import { ProductContextProvider } from './store/product-context';
// import ProductContext from './store/product-context';

function App() {
	// const productCtx = useContext(ProductContext);
	// const [chosenProduct, setChosenProduct] = useState();

	// const selectProductHandler = (selectedProduct) => {
	// 	setChosenProduct(selectedProduct);
	// };

	// async function addProductHandler(product) {
	// 	const response = await fetch(
	// 		'https://stock-manager-fa27c-default-rtdb.europe-west1.firebasedatabase.app/products.json',
	// 		{
	// 			method: 'POST',
	// 			body: JSON.stringify(product),
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		}
	// 	);
	// 	const data = await response.json();
	// 	console.log(data);
	// }

	return (
		<ProductContextProvider>
			<div className="App">
				<AddStock
				// onAddProduct={productCtx.addProductHandler}
				// selected={chosenProduct}
				// onProductSelection={selectProductHandler}
				/>
				<RemoveStock />
				<StockList />
				<AddProduct />
			</div>
		</ProductContextProvider>
	);
}

export default App;
