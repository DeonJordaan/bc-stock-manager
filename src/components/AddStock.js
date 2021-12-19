const AddStock = () => {
	return (
		<section class="add-stock display">
			<form>
				<header class="form-header">Add Stock</header>
				<div class="form__select-product">
					<label for="product-code">Select a Product Code</label>
					<select
						name="product-code"
						id="product-code"
						class="select-product"
					>
						<option value="Select">--Select--</option>
						<option value="product1">Product 1</option>
						<option value="product2">Product 2</option>
						<option value="product3">Product 3</option>
					</select>
				</div>
				<div class="form__items">
					<label for="items-received">Items Received</label>
					<input
						type="number"
						class="items-received"
						id="items-received"
					/>
				</div>
				<div class="form__item-price">
					<label for="item-price">Price per Item Received</label>
					<input type="number" class="item-price" id="item-price" />
				</div>
				<button type="submit">Add Stock</button>
			</form>
		</section>
	);
};

export default AddStock;
