const RemoveStock = () => {
	return (
		<section class="remove-stock display">
			<form>
				<header class="form-header">Remove Stock</header>
				<div class="form__select-product">
					<label for="product-code">Select a Product Code</label>
					<select
						name="product-code"
						id="product-code"
						class="select-product"
					>
						<option value="product1">--Select--</option>
						<option value="product1">Product 1</option>
						<option value="product2">Product 2</option>
						<option value="product3">Product 3</option>
					</select>
				</div>
				<div class="form__buyer-email">
					<label for="buyer-email">Buyer Email Address</label>
					<input type="email" class="buyer-email" id="buyer-email" />
				</div>
				<div class="form__item-price">
					<label for="item-price">Items Bought</label>
					<input type="number" class="item-price" id="item-price" />
				</div>
				<button type="submit">Item Shipped</button>
			</form>
		</section>
	);
};

export default RemoveStock;
