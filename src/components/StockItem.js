import React from 'react';

const StockItem = (props) => {
	return (
		<li className="product__01">
			<div className="product__01--group">
				<div className="product__01--label">{props.name}</div>
				<div className="product__01--average-price">
					{props.averagePrice}
				</div>
			</div>
			<div className="product__01--quantity">{props.quantity}</div>
		</li>
	);
};

export default StockItem;
