import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//constnats
import Hobbies from "../constants/Hobbies";
import Accommodation from "../constants/Accommodation";
import Gender from "../constants/Gender";

//Date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import _ from "lodash";

//Importing function for updating the user
import { updateUser } from "../api/AuthApi";

//Button Component
import { supabase } from "../config/supabase";

//components
import WebButton from "../components/WebButton";
import RentCard from "../components/RentCard";
import WebInput from "../components/WebInput";

//Context
import { useAuth } from "../contexts/AuthContext";
import { useRent } from "../contexts/RentContext";
import { useShop } from "../contexts/ShopContext";

// user profile screen
function ProfileScreen(props) {
	const { users, currentUser, setCurrentUser } = useAuth();
	const { rentItems } = useRent();
	const { shopItems } = useShop();

	const [profile, setProfile] = useState(currentUser);
	const [message, setMessage] = useState();
	const [selectedProfileImage, setSelectedProfileImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [moveInDate, setMoveInDate] = useState(new Date());
	const [imageUploading, setImageUploading] = useState(false);

	//hooks
	const params = useParams();
	const navigate = useNavigate();

	//references
	const firstname = useRef();
	const lastname = useRef();
	const email = useRef();
	const age = useRef();
	const address = useRef();
	const country = useRef();
	const phone = useRef();
	const description = useRef();
	const facebook = useRef();
	const github = useRef();
	const hobbie = useRef();
	const accommodation = useRef();
	const budget = useRef();
	const gender = useRef();

	useEffect(() => {
		console.log("====================================");
		console.log("User Profile");
		console.log("====================================");
	}, [currentUser, rentItems]);

	const handleAccount = (e) => {
		e.preventDefault();

		//set the loading to true
		setLoading(true);
		const user = {
			id: currentUser.id,
			firstname: firstname.current.value || null,
			lastname: lastname.current.value || null,
			phone: phone.current.value || null,
			age: age.current.value || null,
			email: email.current.value || null,
			country: country.current.value || null,
			facebook: facebook.current.value || null,
			github: github.current.value || null,
			description: description.current.value || null,
			hobbie: hobbie.current.value || null,
			address: address.current.value || null,
			accommodation: accommodation.current.value || null,
			budget: budget.current.value || null,
			gender: gender.current.value || null,
		};

		console.log("====================================");
		console.log("my user: ", user);
		console.log("====================================");

		updateUser(user, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
			} else {
				setCurrentUser(data);
			}
			setLoading(false);
		});
	};

	const handleProfileImageUpload = () => {
		if (!selectedProfileImage) {
			setMessage("Please Select an Image First");
			return;
		}

		setMessage(null);

		setImageUploading(true);

		const imageName =
			Date.now() + "." + _.last(selectedProfileImage.name.split("."));

		supabase.storage
			.from("profiles")
			.upload(`avatars/${imageName}`, selectedProfileImage)
			.then((response) => {
				if (response.error) {
					alert("Some Error Occurred When Uploadin Profile Image.");
					setImageUploading(false);
				} else {
					const result = supabase.storage
						.from(response.data.Key)
						.getPublicUrl();
					if (result.publicURL) {
						const temp = {
							...currentUser,
							image: result.data.publicURL.replace(
								`${imageName}/undefined`,
								imageName
							),
						};
						updateUser(temp, ({ error, data }) => {
							if (error) {
								setImageUploading(false);
							} else {
								setCurrentUser(data);
								setImageUploading(false);
							}
						});
					} else setImageUploading(false);
				}
			});
		setSelectedProfileImage(null);
	};

	if (!profile) return <div />;

	return (
		<section className="pt-5">
			<div className="container">
				{/* <h1 className="mb-5">Account Settings</h1> */}
				<div className="bg-white rounded-lg d-block d-sm-flex">
					<div className="profile-tab-nav border-right">
						<div className="p-4">
							<div className="img-circle text-center mb-3">
								<img
									src={
										currentUser.image
											? currentUser.image
											: "https://static.roommates.com/assets/fallback/avatar_default-be023e771899bdd2206080132c31af96050a634521eba8754ca358339890c4c5.png"
									}
									alt="profile image"
									className="shadow"
									style={{ objectFit: "cover" }}
								/>
							</div>

							<h4 className="text-center">{`${profile.firstname} ${profile.lastname}`}</h4>
						</div>
						<div
							className="nav flex-column nav-pills"
							id="v-pills-tab"
							role="tablist"
							aria-orientation="vertical"
						>
							<a
								className="nav-link active"
								id="account-tab"
								data-toggle="pill"
								href="#account"
								role="tab"
								aria-controls="account"
								aria-selected="true"
							>
								<i
									className="fa fa-home text-center mr-1"
									style={{ marginRight: 10 }}
								></i>
								Account
							</a>
							<a
								className="nav-link"
								id="social-tab"
								data-toggle="pill"
								href="#social"
								role="tab"
								aria-controls="social"
								aria-selected="true"
							>
								<i
									className="fa fa-home text-center mr-1"
									style={{ marginRight: 10 }}
								></i>
								Social
							</a>
							<a
								className="nav-link"
								id="rent-tab"
								data-toggle="pill"
								href="#rent"
								role="tab"
								aria-controls="rent"
								aria-selected="true"
							>
								<i
									className="fa fa-home text-center mr-1"
									style={{ marginRight: 10 }}
								></i>
								My Rents
							</a>
							<a
								className="nav-link"
								id="shop-tab"
								data-toggle="pill"
								href="#shop"
								role="tab"
								aria-controls="shop"
								aria-selected="true"
							>
								<i
									className="fa fa-home text-center mr-1"
									style={{ marginRight: 10 }}
								></i>
								My Shop
							</a>
						</div>
					</div>
					<div
						className="tab-content m-5"
						id="v-pills-tabContent"
						style={{ marginLeft: 40 }}
					>
						<div
							className="tab-pane fade show active"
							id="account"
							role="tabpanel"
							aria-labelledby="account-tab"
						>
							<h2 className="mb-4 form-title">Account Settings</h2>

							<div className="row ">
								<div className="col-md-12">
									<div className="mb-3">
										<h5 className="mb-4 form-title">Profile Picture</h5>
										<input
											className="form-control"
											type="file"
											id="formFile"
											onChange={(event) =>
												setSelectedProfileImage(event.target.files[0])
											}
										/>

										{message && (
											<div className="form-group text-danger">{message}</div>
										)}
										<WebButton
											label="Upload Profile Picture"
											onClick={handleProfileImageUpload}
											loading={imageUploading}
											containerStyle={{
												display: "flex",
												flexDirection: "column",
											}}
											style={{ alignSelf: "end", width: "100%" }}
										/>
									</div>
								</div>
							</div>
							<form>
								<div className="row">
									<div className="col-md-6">
										<WebInput
											label="First Name"
											reference={firstname}
											defaultValue={profile.firstname}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Last Name"
											reference={lastname}
											defaultValue={profile.lastname}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Email"
											reference={email}
											defaultValue={profile.email}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Phone Number"
											reference={phone}
											defaultValue={profile.phone}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Age"
											reference={age}
											defaultValue={profile.age}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Gender"
											reference={gender}
											defaultValue={profile.gender}
											dataList={Gender}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Country"
											reference={country}
											defaultValue={profile.country}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Address"
											reference={address}
											defaultValue={profile.address}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Hobbie"
											reference={hobbie}
											defaultValue={profile.hobbie}
											dataList={Hobbies}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Accommodation"
											reference={accommodation}
											defaultValue={profile.accommodation}
											dataList={Accommodation}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Budget"
											reference={budget}
											defaultValue={profile.budget}
										/>
									</div>
									<div className="col-md-6">
										<div style={{ marginTop: 10, marginBottom: 10 }}>
											<label
												style={{
													position: "relative",
													display: "contents",
												}}
											>
												Move In Date
											</label>
											<div style={{ marginTop: 10 }}>
												<DatePicker
													selected={new Date(profile.moveInDate)}
													onChange={(date) => setMoveInDate(date)}
												/>
											</div>
										</div>
									</div>
									<div className="col-md-12">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Description
											</label>
											<textarea
												className="form-control"
												style={{ marginTop: 10 }}
												name="description"
												rows="4"
												ref={description}
												defaultValue={profile.description}
											></textarea>
										</div>
									</div>
								</div>
								<div>
									<WebButton
										loading={loading}
										label={"Update"}
										onClick={handleAccount}
										id="signin"
									/>
								</div>
							</form>
						</div>
						<div
							className="tab-pane fade"
							id="social"
							role="tabpanel"
							aria-labelledby="social-tab"
						>
							<h2 className="mb-4 form-title">Social Settings</h2>
							<form>
								<div className="row">
									<div className="col-md-6">
										<WebInput
											label="Facebook"
											reference={facebook}
											defaultValue={profile.facebook}
										/>
									</div>
									<div className="col-md-6">
										<WebInput
											label="Github"
											reference={github}
											defaultValue={profile.github}
										/>
									</div>
									<div>
										<div className="form-group form-button">
											<input
												type="submit"
												name="saveProfile"
												id="signin"
												className="form-submit"
												value="Save"
											/>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div
							className="tab-pane fade"
							id="rent"
							role="tabpanel"
							aria-labelledby="rent-tab"
						>
							<h2 className="mb-4 form-title">My Items</h2>
							<form>
								<div className="row">
									<div
										style={{
											display: "grid",
											gridTemplateColumns:
												"repeat(auto-fill,minmax(225px,1fr))",
											gridGap: "1em",
										}}
									>
										{rentItems
											.filter(
												(i) =>
													i?.userId?.toString() === currentUser.id.toString()
											)
											.map((item, index) => (
												<RentCard
													key={index}
													item={item}
													onClick={() => navigate(`/rent/${item.id}`)}
													user={users
														.filter(
															(i) => i.id.toString() === item.userId.toString()
														)
														.pop()}
												/>
											))}
									</div>
								</div>
								<h2 className="mb-4 form-title mt-4">Rented Item</h2>
								<div className="row">
									<div
										style={{
											display: "grid",
											gridTemplateColumns:
												"repeat(auto-fill,minmax(225px,1fr))",
											gridGap: "1em",
										}}
									>
										{rentItems
											.filter(
												(i) =>
													i?.rentedUserId?.toString() ===
													currentUser.id.toString()
											)
											.map((item, index) => (
												<RentCard
													key={index}
													item={item}
													onClick={() => navigate(`/rent/${item.id}`)}
													user={users
														.filter(
															(i) =>
																i.id.toString() === item?.userId?.toString()
														)
														.pop()}
												/>
											))}
									</div>
								</div>
							</form>
						</div>
						<div
							className="tab-pane fade"
							id="shop"
							role="tabpanel"
							aria-labelledby="shop-tab"
						>
							<h2 className="mb-4 form-title">My Items</h2>
							<form>
								<div className="row">
									<div
										style={{
											display: "grid",
											gridTemplateColumns:
												"repeat(auto-fill,minmax(225px,1fr))",
											gridGap: "1em",
										}}
									>
										{shopItems
											.filter(
												(i) =>
													i?.userId?.toString() === currentUser.id.toString()
											)
											.map((item, index) => (
												<RentCard
													key={index}
													item={item}
													showRentBtn={false}
													onClick={() => navigate(`/shop/${item.id}`)}
													user={users
														.filter(
															(i) => i.id.toString() === item.userId.toString()
														)
														.pop()}
												/>
											))}
									</div>
								</div>
								<h2 className="mb-4 form-title mt-4">Bought Item</h2>
								<div className="row">
									<div
										style={{
											display: "grid",
											gridTemplateColumns:
												"repeat(auto-fill,minmax(225px,1fr))",
											gridGap: "1em",
										}}
									>
										{shopItems
											.filter(
												(i) =>
													i?.buyerId?.toString() === currentUser.id.toString()
											)
											.map((item, index) => (
												<RentCard
													key={index}
													item={item}
													showRentBtn={false}
													onClick={() => navigate(`/shop/${item.id}`)}
													user={users
														.filter(
															(i) =>
																i.id.toString() === item?.userId?.toString()
														)
														.pop()}
												/>
											))}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ProfileScreen;
