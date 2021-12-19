class Product {
	constructor(
		product,
		description,
		price,
		quantity,
		averagePrice, //maybe not include this hereand only as a method SOMEWHERE?
		prices
	) {
		this.product = product;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.averagePrice = averagePrice;
		this.prices = prices;
	}
}

export default Product;
