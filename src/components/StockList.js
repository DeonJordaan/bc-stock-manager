import { useContext } from 'react';

import StockItem from './StockItem';

import ProductContext from '../store/product-context';

const StockList = () => {
	const productCtx = useContext(ProductContext);

	let stockContent = <div>No products available</div>;

	if (productCtx.products) {
		stockContent = (
			<ul id="stock-list">
				{productCtx.products.map((product) => (
					<StockItem
						product={product.product}
						quantity={product.quantity}
						averagePrice={product.averagePrice}
					/>
				))}
			</ul>
		);
	}

	return (
		<section class="stock-levels display product">
			<header class="form-header">Stock Levels</header>
			<>{stockContent}</>
		</section>
	);
};

export default StockList;
