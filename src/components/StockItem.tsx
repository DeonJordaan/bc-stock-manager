import React from 'react';
import classes from './StockItem.module.css';

const StockItem: React.FC<{
	name: string;
	averagePrice: number;
	quantity: number;
}> = (props) => {
	return (
		<li className={classes['product__item']}>
			<div className="product__item--group">
				<div className={classes['product__item--label']}>
					{props.name}
				</div>
				<div className="product__item--average-price">
					{props.averagePrice}
				</div>
			</div>
			<div className="product__01--quantity">{props.quantity}</div>
		</li>
	);
};

export default StockItem;
