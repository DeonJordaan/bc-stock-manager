import { update, ref } from 'firebase/database';
import { useContext, useState } from 'react';
import EmailContext from '../store/email-context';
import database from '../store/firebase';
import ProductContext from '../store/product-context';

const RemoveStock = () => {
	const emailCtx = useContext(EmailContext);
	const productCtx = useContext(ProductContext);

	const [productName, setProductName] = useState();
	const [enteredEmail, setEnteredEmail] = useState();
	const [itemsPurchased, setItemsPurchased] = useState();

	let product = {};

	// Collect user inputs
	const selectDropdownHandler = (event) => {
		setProductName(event.target.value);
	};

	const emailHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const itemsPurchasedHanlder = (event) => {
		setItemsPurchased(event.target.value);
	};

	// Process logic
	const submitHandler = (event) => {
		event.preventDefault();

		// Check if the email has been used
		if (emailCtx.emails?.includes(enteredEmail)) {
			// If it has been used, alert the customer and decline the purchase
			alert('Sorry! Only one purchase per customer allowed');
			return;
		}
		// If it has not been used, allow the purchase to go ahead and add the email to the DB
		else {
			product = {
				name: productName.toUpperCase(),
				quantity: +itemsPurchased,
				email: enteredEmail,
			};
		}

		removeProductHandler();
		setProductName('');
		setEnteredEmail('');
		setItemsPurchased('');
	};

	// Subtract the items from the database
	const removeProductHandler = () => {
		const thisProduct = productCtx.products.find(
			(element) => element.productName === product.name
		);

		const updatedEmails = emailCtx.emails.push(enteredEmail);
		// emailCtx.setEmails(updatedEmails);
		const updatedQuantity = thisProduct.quantity + product.quantity;
		const productKey = thisProduct.id;

		//Update product in DB
		update(ref(database, `/products/${productKey}`), {
			quantity: updatedQuantity,
		});

		update(ref(database, `/emails`), {
			updatedEmails,
		});

		alert('Purchase successfull');
	};

	return (
		<section className="remove-stock display">
			<form>
				{/* <form onSubmit={submitHandler}> */}
				<header className="form-header">Remove Stock</header>
				<div className="form__select-product">
					<label htmlFor="product-code">Select a Product Code</label>
					<select
						name="product-code"
						id="product-code"
						className="select-product"
						value={productName}
						onChange={selectDropdownHandler}
					>
						<option value="Select">--Select--</option>
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
						value={enteredEmail}
						onChange={emailHandler}
					/>
				</div>
				<div className="form__item-price">
					<label htmlFor="item-price">Items Bought</label>
					<input
						type="number"
						className="item-price"
						id="item-price"
						value={itemsPurchased}
						onChange={itemsPurchasedHanlder}
					/>
				</div>
				<button onClick={submitHandler} type="submit">
					Item Shipped
				</button>
			</form>
		</section>
	);
};

export default RemoveStock;
