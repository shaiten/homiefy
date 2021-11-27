import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Component
import WebButton from "../components/WebButton";

//Hooks
import { useAuth } from "../contexts/AuthContext";

//Lodash
import _ from "lodash";

//shop context
import { useShop } from "../contexts/ShopContext";

//Checkout screen for payment
function CheckOutScreen(props) {
	const { users, currentUser } = useAuth();
	const { shopItems, handleShopItem } = useShop();

	const [loading, setLoading] = useState(false);
	const [shopItem, setShopItem] = useState();
	const [shopUser, setShopUser] = useState();

	const [message, setMessage] = useState();

	const [cardHolder, setCardHolder] = useState();
	const [cardNumber, setCardNumber] = useState("0000000000000000");
	const [cvv, setCvv] = useState("123");
	const [expDate, setExpDate] = useState(new Date());

	const [isOwner, setIsOwner] = useState(false);

	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (params?.id && params.id !== undefined) {
			console.log("====================================");
			console.log("my id", params.id);
			console.log("====================================");

			const shopItem = _.filter(
				shopItems,
				(i) => i.id.toString() === params.id
			).pop();

			const shopUser = _.filter(
				users,
				(i) => i?.id?.toString() === shopItem?.userId?.toString()
			).pop();

			if (shopUser.id.toString() === currentUser?.id?.toString())
				setIsOwner(true);

			setShopItem(shopItem);
			setShopUser(shopUser);
		}
	}, [shopItem]);

	const handleCheckout = () => {
		if (
			cardHolder === "" ||
			cardNumber === "" ||
			cardNumber === "0000000000000000" ||
			cvv === ""
		) {
			setMessage("Fill all the fields with valid data.");
			return;
		}

		setMessage("");

		setLoading(true);
		handleShopItem(shopItem, currentUser.id, () => {
			setLoading(false);
			navigate("/shop");
		});
	};

	if (!shopItem) return <div></div>;

	return (
		<section className="sign-in">
			<div className="container">
				<div className="row justify-content-center signin-content">
					<div className="col-md-6 mb-5 display-flex justify-content-center">
						<div class="payment-card">
							<div class="top">
								<h1>
									<i>CARD</i>
								</h1>
								{/* <h2>credit card</h2> */}
							</div>

							<div class="mid">
								<h2>card number</h2>
								<div class="payment-card-number">
									{!cardNumber && (
										<>
											<span>0000</span>
											<span>0000</span>
											<span>0000</span>
											<span>0000</span>
										</>
									)}
									{cardNumber &&
										cardNumber.match(/.{1,4}/g).map((i) => <span>{i}</span>)}
								</div>
							</div>

							<div class="bottom">
								<div class="payment-card-holder">
									<h2>card holder</h2>
									<span>{cardHolder || "Your Name"}</span>
								</div>
								<div class="express">
									<h2>Expiration</h2>
									<span>{expDate.getDate()}</span> /
									<span>{expDate.getFullYear()}</span>
								</div>
								<div class="cvv">
									<h2>cvv</h2>
									{!cvv && (
										<>
											<span>1</span>
											<span>2</span>
											<span>3</span>
										</>
									)}
									{cvv && Array.from(cvv).map((i) => <span>{i}</span>)}
									{/* <span>7</span>
									<span>5</span>
									<span>1</span> */}
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<h2 className="form-title">Checkout</h2>
						<form method="POST" className="register-form" id="login-form">
							<div className="form-group">
								<label for="cardHolder">
									<i className="fa fa-user"></i>
								</label>
								<input
									type="text"
									name="cardHolder"
									id="cardHolder"
									placeholder="Card Holder"
									onChange={(e) => setCardHolder(e.target.value)}
									// defaultValue="Your Name"
								/>
							</div>
							<div className="form-group">
								<label for="cardNumber">
									<i className="fa fa-credit-card"></i>
								</label>
								<input
									type="text"
									name="cardNumber"
									id="cardNumber"
									pattern="\d*"
									maxLength={16}
									placeholder="Card Number"
									onChange={(e) => setCardNumber(e.target.value)}
									// defaultValue="4878787872878277"
								/>
							</div>
							<div className="row" style={{ marginBottom: 25 }}>
								<div className="col-md-6">
									<div className="form-group">
										<label for="expiration">
											<i className="fa fa-calendar"></i>
										</label>
										<input
											type="datetime-local"
											name="expiration"
											id="expiration"
											placeholder="Expiration Date"
											onChange={(e) => setExpDate(new Date(e.target.value))}
										/>
										{/* <ReactDatePicker
											selected={new Date()}
											onChange={(date) => setExpDate(date)}
										/> */}
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label for="cvv">
											<i className="fa fa-lock"></i>
										</label>
										<input
											type="text"
											name="cvv"
											id="cvv"
											placeholder="CVV"
											maxLength={3}
											onChange={(e) => setCvv(e.target.value)}
											// defaultValue="123"
										/>
									</div>
								</div>
							</div>

							{message && (
								<div className="form-group text-danger">{message}</div>
							)}

							<WebButton
								label="Checkout"
								id="checkout"
								loading={loading}
								onClick={handleCheckout}
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CheckOutScreen;
