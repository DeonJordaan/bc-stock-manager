class Product {
	constructor(
		id,
		productName,
		description,
		quantity,
		averagePrice, //maybe not include this hereand only as a method SOMEWHERE?
		prices
	) {
		this.id = id;
		this.productName = productName;
		this.description = description;
		this.quantity = quantity;
		this.averagePrice = averagePrice;
		this.prices = prices;
	}
}

export default Product;
