import React, { createRef, useEffect, useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import AddProfileModal from "./AddProfileModal";
import DeleteProfileModal from "./deleteProfileModal";
import EditProfileModal from "./EditProfileModal";

const Profiles = (props) => {
	const [profiles, setProfiles] = useState([]);
	const [profileDeleteId, setProfileDeleteId] = useState(null);
	const [profileEditId, setProfileEditId] = useState(null);
	const [editProfile, setEditProfile] = useState({});
	const profilesData = useRef();

	const [user, setUser] = useState();

	console.log();

	useEffect(() => {
		if (profiles.length <= 0) {
			setUser(supabase.auth.user());
			getProfiles();
			fetchProfiles();
		}
	}, []);

	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState({ name: "", address: "" });
	const { name, address } = post;

	async function getProfiles() {
		const { data } = await supabase
			.from("profiles")
			.select()
			.eq("createdBy", supabase.auth.user().id);
		profilesData.current = data;
		setProfiles(data);
	}

	function fetchProfiles() {
		supabase
			.from("profiles")
			.on("INSERT", (payload) => {
				const temp = [...profilesData.current];
				temp.push(payload.new);

				profilesData.current = temp;
				setProfiles(temp);
			})
			.subscribe();

		supabase
			.from("profiles")
			.on("UPDATE", (payload) => {
				const temp = profilesData.current.filter(
					(profile) => profile.id !== payload.new.id
				);
				temp.push(payload.new);

				profilesData.current = temp;
				setProfiles(temp);
			})
			.subscribe();

		supabase
			.from("profiles")
			.on("DELETE", (payload) => {
				if (profilesData.current.length > 0) {
					const temp = profilesData.current.filter(
						(profile) => profile.id !== payload.old.id
					);

					profilesData.current = temp;
					setProfiles(temp);

					setProfileDeleteId(null);
				}
			})
			.subscribe();

		// setProfiles();
		// console.log("data: ", data);
	}

	return (
		<div className="row mb-3 mr-0 justify-content-center">
			<div className="col-10  m-3">
				<div className="d-flex justify-content-end">
					<button
						type="button"
						className="btn btn-outline-primary"
						data-bs-toggle="modal"
						data-bs-target="#addProfileModal"
						disabled={profiles.length > 0}
					>
						Add Profile
					</button>
					<AddProfileModal />
				</div>

				<table class="table table-borderless mt-3">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">NAME</th>
							<th scope="col">Email</th>
							<th scope="col">AGE</th>
							<th scope="col">COLLEGE</th>
							<th scope="col">DEPARTMENT</th>
							{/* <th scope="col">INTEREST</th> */}
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						{
							//.slice at index zero and reverse to show most recent first
							profiles.map((profile, index) => (
								<tr key={profile.id}>
									<th scope="row">{index + 1}</th>
									<td>{`${profile.firstName} ${profile.lastName}`}</td>
									<td>{profile.email}</td>
									<td>{profile.age}</td>
									<td>{profile.college}</td>
									<td>{profile.department}</td>
									{/* <td>{profile.interest}</td> */}
									<td>
										<div className="row justify-content-center ">
											<div className="col" style={{ flex: 0 }}>
												<button
													type="button"
													class="btn btn-outline-success"
													data-bs-toggle="modal"
													data-bs-target="#editProfileModal"
													onClick={() => {
														setProfileEditId(profile.id);
														setEditProfile(profile);
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														class="bi bi-pencil-square"
														viewBox="0 0 16 16"
													>
														<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
														<path
															fillRule="evenodd"
															d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
														/>
													</svg>
												</button>
											</div>
											<div className="col" style={{ flex: 0 }}>
												<button
													type="button"
													class="btn btn-outline-danger"
													data-bs-toggle="modal"
													data-bs-target="#deleteProfileModal"
													onClick={() => {
														setProfileDeleteId(profile.id);
														setEditProfile(profile);
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														class="bi bi-trash"
														viewBox="0 0 16 16"
													>
														<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
														<path
															fillRule="evenodd"
															d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
														/>
													</svg>
												</button>
											</div>
										</div>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
				{profiles.length <= 0 && (
					<div style={{ fontWeight: "bold" }}>No Profiles Available</div>
				)}
			</div>
			<EditProfileModal profile={editProfile} />
			<DeleteProfileModal
				profileDeleteId={profileDeleteId}
				setProfileDeleteId={setProfileDeleteId}
			/>
		</div>
	);
};

export default Profiles;
