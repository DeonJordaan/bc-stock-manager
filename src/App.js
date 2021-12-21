import React from 'react';
import './App.css';
import AddStock from './components/AddStock';
import RemoveStock from './components/RemoveStock';
import StockList from './components/StockList';

function App() {
	return (
		<div className="App">
			<AddStock />
			<RemoveStock />
			<StockList />
		</div>
	);
}

export default App;
