import React from 'react';
import './App.css';
import AddStock from './components/AddStock';
import RemoveStock from './components/RemoveStock';
import StockList from './components/StockList';
import AddProduct from './components/AddProduct';
import { ProductContextProvider } from './store/product-context';
import { EmailContextProvider } from './store/email-context';

function App() {
	return (
		<ProductContextProvider>
			<div className="App">
				<AddStock />
				<EmailContextProvider>
					<RemoveStock />
				</EmailContextProvider>
				<StockList />
				<AddProduct />
			</div>
		</ProductContextProvider>
	);
}

export default App;
