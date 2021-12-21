const RemoveStock = () => {
	return (
		<section className="remove-stock display">
			<form>
				<header className="form-header">Remove Stock</header>
				<div className="form__select-product">
					<label htmlFor="product-code">Select a Product Code</label>
					<select
						name="product-code"
						id="product-code"
						className="select-product"
					>
						<option value="product1">--Select--</option>
						<option value="product1">Product 1</option>
						<option value="product2">Product 2</option>
						<option value="product3">Product 3</option>
					</select>
				</div>
				<div className="form__buyer-email">
					<label htmlFor="buyer-email">Buyer Email Address</label>
					<input
						type="email"
						className="buyer-email"
						id="buyer-email"
					/>
				</div>
				<div className="form__item-price">
					<label htmlFor="item-price">Items Bought</label>
					<input
						type="number"
						className="item-price"
						id="item-price"
					/>
				</div>
				<button type="submit">Item Shipped</button>
			</form>
		</section>
	);
};

export default RemoveStock;
