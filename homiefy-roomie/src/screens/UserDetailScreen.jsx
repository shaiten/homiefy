import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//Component
import WebButton from "../components/WebButton";

//Constants
import Hobbies from "../constants/Hobbies";

//Hooks for authentication
import { useAuth } from "../contexts/AuthContext";

//Lodash
import _ from "lodash";
import Colors from "../constants/Colors";

//Roommate Profile Screen
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
											profile.image
												? profile.image
												: "https://static.roommates.com/assets/fallback/avatar_default-be023e771899bdd2206080132c31af96050a634521eba8754ca358339890c4c5.png"
										}
										alt="profile image"
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
								>{`${profile.firstname} ${profile.lastname}`}</h3>
								<h5
									style={{
										color: Colors.text,
										fontFamily: "Poppins",
										fontWeight: "bold",
										textShadow: " 1px 5px 20px #e2e2e2",
									}}
								>{`${profile.gender ? profile.gender + "-" : ""} ${
									profile.age ? profile.age + " Years" : ""
								}`}</h5>

								<ul className="socials text-center justify-content-center">
									<li>
										<a href={profile.facebook || "#"}>
											<i
												className="display-flex-center zmdi zmdi-facebook fa fa-facebook"
												style={{ display: "inline-flex" }}
											></i>
										</a>
									</li>
									{/* <li>
										<a href="#">
											<i className="display-flex-center zmdi zmdi-twitter fa fa-twitter"></i>
										</a>
									</li> */}
									<li>
										<a href={profile.github || "#"}>
											<i
												className="display-flex-center zmdi zmdi-google fa fa-github"
												style={{ display: "inline-flex" }}
											></i>
										</a>
									</li>
								</ul>
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
										<td>Budget</td>
										<td>{profile.budget ? `${profile.budget}$` : ""}</td>
									</tr>
									<tr>
										<td>Accommodation</td>
										<td>
											{profile.accommodation
												? `For ${profile.accommodation}`
												: ""}
										</td>
									</tr>
									<tr>
										<td>Ready To Move</td>
										<td>{profile.moveInDate ? profile.moveInDate : ""}</td>
									</tr>
									<tr>
										<td>Looking In</td>
										<td>{profile.address ? profile.address : ""}</td>
									</tr>
									<tr>
										<td>Country</td>
										<td>{profile.country ? profile.country : ""}</td>
									</tr>
									<tr>
										<td>Hobbie</td>
										<td>{profile.hobbie ? profile.hobbie : ""}</td>
									</tr>
									<tr>
										<td>Phone</td>
										<td>{profile.phone ? profile.phone : ""}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="col-md-8 mt-5">
							<h5 style={{ margin: 0, fontFamily: "Poppins" }}>Description</h5>
							<div
								className="mt-3 form-signup"
								style={{ fontFamily: "Poppins" }}
							>
								{profile &&
									profile?.description?.split("\n").map((i) => <p>{i}</p>)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default UserDetailScreen;
