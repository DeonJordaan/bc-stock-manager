class Product {
	constructor(
		productName,
		description,
		price,
		quantity,
		averagePrice, //maybe not include this hereand only as a method SOMEWHERE?
		prices
	) {
		this.productName = productName;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
		this.averagePrice = averagePrice;
		this.prices = prices;
	}
}

export default Product;
