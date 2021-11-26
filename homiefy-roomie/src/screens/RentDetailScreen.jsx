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
import { useRent } from "../contexts/RentContext";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RentDetailScreen(props) {
	const { users, currentUser } = useAuth();
	const { rentItems, handleRentItem, handleRentItemDelete } = useRent();

	const [loading, setLoading] = useState(false);
	const [rentItem, setRentItem] = useState();
	const [rentUser, setRentUser] = useState();
	const [rentingDate, setRentingDate] = useState();

	const [isOwner, setIsOwner] = useState(false);

	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (params?.id && params.id !== undefined) {
			console.log("====================================");
			console.log("my id", params.id);
			console.log("====================================");

			const rentItem = _.filter(
				rentItems,
				(i) => i.id.toString() === params.id
			).pop();

			const rentUser = _.filter(
				users,
				(i) => i?.id?.toString() === rentItem?.userId?.toString()
			).pop();

			if (rentUser.id.toString() === currentUser?.id?.toString())
				setIsOwner(true);

			setRentItem(rentItem);
			setRentUser(rentUser);
		}
	}, [rentItem]);

	if (!rentItem) return <div></div>;

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
											rentItem.image
												? rentItem.image
												: "https://static.roommates.com/assets/fallback/avatar_default-be023e771899bdd2206080132c31af96050a634521eba8754ca358339890c4c5.png"
										}
										alt="rent image"
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
									{rentItem.title}
								</h3>
								{/* <h5 style={{ color: Colors.secondary }}>{rent.price} $</h5> */}
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
										<td>{rentItem.price}$</td>
									</tr>

									{rentItem.authors && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Authors</td>
											<td>{rentItem.authors}</td>
										</tr>
									)}

									{rentItem.publisher && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Publisher</td>
											<td>{rentItem.publisher}</td>
										</tr>
									)}

									{rentItem.edition && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Edition</td>
											<td>{rentItem.edition}</td>
										</tr>
									)}

									{rentItem.isbn && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>ISBN</td>
											<td>{rentItem.isbn}</td>
										</tr>
									)}

									{rentItem.format && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Format</td>
											<td>{rentItem.format}</td>
										</tr>
									)}

									<tr>
										{/* <th scope="row">1</th> */}
										<td>Uploaded By</td>
										<td>
											<Link
												to={`/profile/${rentUser.id}`}
											>{`${rentUser.firstname} ${rentUser.lastname}`}</Link>
										</td>
									</tr>

									{rentUser.phone && (
										<tr>
											{/* <th scope="row">1</th> */}
											<td>Phone</td>
											<td>{rentUser.phone}</td>
										</tr>
									)}
								</tbody>
							</table>
							<div style={{ marginTop: 10, marginBottom: 10 }}>
								<label
									style={{
										position: "relative",
										display: "contents",
									}}
								>
									<h5 style={{ margin: 0, fontFamily: "Poppins" }}>
										Renting Till
									</h5>
								</label>
								<div style={{ marginTop: 10 }}>
									<ReactDatePicker
										selected={
											rentItem?.rentingTill === null
												? new Date()
												: new Date(rentItem?.rentingTill)
										}
										onChange={(date) => setRentingDate(date)}
									/>
								</div>
							</div>
							{/* Show The Rent Button To Only Other Users */}
							{!isOwner ? (
								rentItem?.rentedUserId?.toString() !==
								currentUser?.id?.toString() ? (
									<WebButton
										label="Rent"
										containerStyle={{ width: "100%" }}
										style={{ width: "100%", height: 50 }}
										loading={loading}
										onClick={() => {
											if (!rentingDate) {
												alert("Please Select The Date.");
												return;
											}

											setLoading(true);
											handleRentItem(rentItem, currentUser.id, () => {
												setLoading(false);
												navigate("/rent");
											});
										}}
									/>
								) : (
									<WebButton
										label="Rented"
										containerStyle={{ width: "100%" }}
										style={{
											width: "100%",
											height: 50,
											backgroundColor: "#00C851",
											cursor: "default",
										}}
										disabled={true}
									/>
								)
							) : (
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

										handleRentItemDelete(
											{ ...rentItem, rentingTill: rentingDate },
											() => {
												setLoading(false);
												navigate("/rent");
											}
										);
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
								{rentItem?.description &&
									rentItem.description.split("\n").map((i) => <p>{i}</p>)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default RentDetailScreen;
