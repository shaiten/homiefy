import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

//Component
import WebButton from "../components/WebButton";

//Constants
import Hobbies from "../constants/Hobbies";

//Hooks
import { useAuth } from "../contexts/AuthContext";

//Lodash
import _ from "lodash";
import Colors from "../constants/Colors";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//shop context
import { useShop } from "../contexts/ShopContext";

//Shop Detail Screen
function ShopDetailScreen(props) {
	const { users, currentUser } = useAuth();
	const { shopItems, handleShopItem, handleShopItemDelete } = useShop();

	const [loading, setLoading] = useState(false);
	const [shopItem, setShopItem] = useState();
	const [shopingDate, setShopingDate] = useState();
	const [shopUser, setShopUser] = useState();

	const [isOwner, setIsOwner] = useState(false);

	//hooks
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

			console.log("====================================");
			console.log(shopUser, currentUser);
			console.log("====================================");

			if (
				shopUser.id.toString() === currentUser?.id?.toString() ||
				(shopItem?.buyerId &&
					shopItem.buyerId.toString() === currentUser?.id?.toString())
			)
				setIsOwner(true);

			setShopItem(shopItem);
			setShopUser(shopUser);
		}
	}, [shopItem]);

	if (!shopItem) return <div></div>;

	return (
		<section className="pt-5">
			<div className="container">
				<div
					style={{
						backgroundColor: Colors.white,
						borderRadius: 10,
						background:
							"url('https://previews.123rf.com/images/nikkusha/nikkusha1909/nikkusha190900015/137084365-memphis-pattern-abstract-background-trendy-memphis-style-simple-seamless-pastel-geometric-vector-bac.jpg') 50% 50% no-repeat",
					}}
				>
					<div className="row" style={{ height: "100%" }}>
						<div className="col-md-12 text-center mb-3 personal_text">
							<div className="p-4 ">
								<div className="img-circle text-center mb-3">
									<img
										src={
											shopItem.image
												? shopItem.image
												: "https://static.roommates.com/assets/fallback/avatar_default-be023e771899bdd2206080132c31af96050a634521eba8754ca358339890c4c5.png"
										}
										alt="shop image"
										className="shadow"
										style={{ objectFit: "cover", width: 200, height: 200 }}
									/>
								</div>
								<h3
									style={{
										fontFamily: "Poppins",
										fontWeight: "bold",
										textShadow: " 1px 5px 20px #e2e2e2",
									}}
								>
									{shopItem.title}
								</h3>
								{/* <h5 style={{ color: Colors.secondary }}>{shop.price} $</h5> */}
							</div>
						</div>
					</div>
				</div>
				<div style={{ borderRadius: 10 }}>
					<div
						className="row justify-content-center mb-5"
						style={{ height: "100%" }}
					>
						<div className="col-md-4  mt-5 mb-3 personal_text">
							<h5 style={{ margin: 0, fontFamily: "Poppins" }}>Details</h5>
							<table className="table table-striped table-borderless mt-3">
								<tbody>
									<tr>
										{/* <th scope="row">1</th> */}
										<td>Price</td>
										<td>{shopItem.price}$</td>
									</tr>

									{shopItem.authors && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Authors</td>
											<td>{shopItem.authors}</td>
										</tr>
									)}

									{shopItem.publisher && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Publisher</td>
											<td>{shopItem.publisher}</td>
										</tr>
									)}

									{shopItem.edition && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Edition</td>
											<td>{shopItem.edition}</td>
										</tr>
									)}

									{shopItem.isbn && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>ISBN</td>
											<td>{shopItem.isbn}</td>
										</tr>
									)}

									{shopItem.format && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Format</td>
											<td>{shopItem.format}</td>
										</tr>
									)}

									<tr>
										{/* <th scope="row">1</th> */}
										<td>Uploaded By</td>
										<td>
											<Link
												to={`/profile/${shopUser.id}`}
											>{`${shopUser.firstname} ${shopUser.lastname}`}</Link>
										</td>
									</tr>

									{shopUser.phone && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Phone</td>
											<td>{shopUser.phone}</td>
										</tr>
									)}
								</tbody>
							</table>
							{/* Show The Shop Button To Only Other Users */}
							{!isOwner && (
								<WebButton
									label="Buy"
									containerStyle={{ width: "100%" }}
									style={{ width: "100%", height: 50 }}
									loading={loading}
									onClick={() => {
										// setLoading(true);
										// handleShopItem(shopItem, currentUser.id, () => {
										// 	setLoading(false);
										// 	navigate("/shop");
										// });
										navigate(`/shop/checkout/${shopItem.id}`);
									}}
								/>
							)}
							{isOwner && shopItem.buyerId && (
								<WebButton
									label="Delete"
									containerStyle={{ width: "100%" }}
									style={{
										width: "100%",
										height: 50,
										backgroundColor: "#dc3543",
									}}
									loading={loading}
									onClick={() => {
										setLoading(true);

										handleShopItemDelete(shopItem, () => {
											setLoading(false);
											navigate("/shop");
										});
									}}
								/>
							)}
						</div>

						<div className="col-md-8 mt-5">
							<h5 style={{ margin: 0, fontFamily: "Poppins" }}>Description</h5>
							<div
								className="mt-3 form-signup"
								style={{ fontFamily: "Poppins" }}
							>
								{shopItem?.description &&
									shopItem.description.split("\n").map((i) => <p>{i}</p>)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ShopDetailScreen;
