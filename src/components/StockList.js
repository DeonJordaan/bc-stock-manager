import React, { useContext } from 'react';
import StockItem from './StockItem';
import ProductContext from '../store/product-context';
import classes from './StockList.module.css';

const StockList = () => {
	// Extract context values
	const productCtx = useContext(ProductContext);

	// Set default content
	let stockContent = <div>No products available</div>;

	// If products are available, render stock item for each product
	if (productCtx.products?.length > 0) {
		stockContent = (
			<ul id="stock-list">
				{productCtx.products.map((product) => (
					<StockItem
						key={product.id}
						name={product.productName}
						quantity={product.quantity}
						averagePrice={product.averagePrice}
					/>
				))}
			</ul>
		);
	}

	return (
		<section
			className={`${classes['stock-levels']} ${classes.display} ${classes.product}`}
		>
			<div className={classes.stocklist}>
				<header className="form-header">Stock Levels</header>
				<>{stockContent}</>
			</div>
		</section>
	);
};

export default StockList;
