import React, { useState } from 'react';
import './App.css';
import AddStock from './components/AddStock';
import RemoveStock from './components/RemoveStock';
import StockList from './components/StockList';

function App() {
	const [chosenProduct, setChosenProduct] = useState();

	const selectProductHandler = (selectedProduct) => {
		setChosenProduct(selectedProduct);
	};
	return (
		<div className="App">
			<AddStock
				selected={chosenProduct}
				onProductSelection={selectProductHandler}
			/>
			<RemoveStock />
			<StockList />
		</div>
	);
}

export default App;
