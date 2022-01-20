import DataInterface from './dataInterface';

class Product {
	key?: string;
	id?: string;
	productName: string;
	description?: string;
	prices?: number[] | undefined;
	averagePrice?: number;
	quantity: number;

	constructor(data: DataInterface) {
		this.key = data.key;
		this.id = data.id;
		this.productName = data.productName;
		this.description = data.description;
		this.prices = data.prices;
		this.averagePrice = data.averagePrice;
		this.quantity = data.quantity;
	}
}

export default Product;
