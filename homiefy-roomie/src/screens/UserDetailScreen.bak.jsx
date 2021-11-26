import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Component
import WebButton from "../components/WebButton";

//Constants
import Hobbies from "../constants/Hobbies";

//Hooks
import { useAuth } from "../contexts/AuthContext";

//Lodash
import _ from "lodash";

function UserDetailScreen(props) {
	const { users, currentUser } = useAuth();

	const [profile, setProfile] = useState(null);

	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (params?.id && params.id !== undefined && profile === null) {
			console.log("====================================");
			console.log("my id", params.id);
			console.log("====================================");

			if (params.id.toString() === currentUser.id.toString()) {
				navigate("/profile");
			}

			const profile = _.filter(
				users,
				(i) => i.id.toString() === params.id
			).pop();

			setProfile(profile);
		}
	}, [profile]);

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
										profile.image
											? profile.image
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
								Profile
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
						</div>
					</div>
					<div
						className="tab-content"
						id="v-pills-tabContent"
						style={{ marginLeft: 40 }}
					>
						<div
							className="tab-pane fade show active"
							id="account"
							role="tabpanel"
							aria-labelledby="account-tab"
						>
							{/* <h2 className="mb-4 form-title">User Profile</h2> */}
							<form>
								<div className="row">
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												First Name
											</label>

											<input
												type="text"
												className="form-control"
												name="firstname"
												style={{ marginTop: 10 }}
												defaultValue={profile.firstname}
												readOnly={true}
											/>
											{/* {profile.firstname} */}
										</div>
									</div>
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Last Name
											</label>
											<input
												type="text"
												className="form-control"
												name="lastname"
												style={{ marginTop: 10 }}
												defaultValue={profile.lastname}
												readOnly={true}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Email
											</label>
											<input
												type="text"
												className="form-control"
												name="email"
												style={{ marginTop: 10 }}
												defaultValue={profile.email}
												readOnly={true}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Phone number
											</label>
											<input
												type="text"
												className="form-control"
												name="phone"
												style={{ marginTop: 10 }}
												defaultValue={profile.phone}
												readOnly={true}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Age
											</label>
											<input
												type="text"
												className="form-control"
												name="age"
												style={{ marginTop: 10 }}
												defaultValue={profile.age}
												readOnly={true}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Country
											</label>
											<input
												type="text"
												className="form-control"
												name="country"
												style={{ marginTop: 10 }}
												defaultValue={profile.country}
												readOnly={true}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Address
											</label>
											<input
												type="text"
												className="form-control"
												name="address"
												style={{ marginTop: 10 }}
												defaultValue={profile.address}
												readOnly={true}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Hobbie
											</label>
											<input
												type="text"
												className="form-control"
												name="hobbie"
												style={{ marginTop: 10 }}
												defaultValue={profile.hobbie}
												list="dataListHobbie"
												readOnly={true}
											/>
											<datalist id="dataListHobbie">
												{Hobbies.map((i, index) => (
													<option value={i} key={index} />
												))}
											</datalist>
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
												Bio
											</label>
											<textarea
												className="form-control"
												style={{ marginTop: 10 }}
												name="bio"
												rows="4"
												defaultValue={profile.bio}
												readOnly={true}
											></textarea>
										</div>
									</div>
								</div>
							</form>
						</div>
						<div
							className="tab-pane fade"
							id="social"
							role="tabpanel"
							aria-labelledby="social-tab"
						>
							<h2 className="mb-4 form-title">Social Contact</h2>
							<form>
								<div className="row">
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Facebook
											</label>
											<input
												type="text"
												className="form-control"
												name="facebook"
												style={{ marginTop: 10 }}
												readOnly={true}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<div
											className="form-group"
											style={{ marginTop: 10, marginBottom: 10 }}
										>
											<label
												style={{ position: "relative", display: "contents" }}
											>
												Github
											</label>
											<input
												type="text"
												className="form-control"
												name="github"
												style={{ marginTop: 10 }}
												readOnly={true}
											/>
										</div>
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

export default UserDetailScreen;
