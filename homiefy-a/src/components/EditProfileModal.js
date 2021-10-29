import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const EditProfileModal = (props) => {
	const [profileId, setProfileId] = useState(props.profile.id);
	const [firstName, setFirstName] = useState(props.profile.firstName);
	const [lastName, setLastName] = useState(props.profile.lastName);
	const [username, setUsername] = useState(props.profile.username);
	const [password, setPassword] = useState(props.profile.password);
	const [email, setEmail] = useState(props.profile.email);
	const [college, setCollege] = useState(props.profile.college);
	const [department, setDepartment] = useState(props.profile.department);
	const [age, setAge] = useState(props.profile.age);
	const [interest, setInterest] = useState(props.profile.interest);
	const [description, setDescription] = useState(props.profile.description);

	useEffect(() => {
		const {
			id,
			firstName,
			lastName,
			email,
			username,
			password,
			age,
			interest,
			description,
			college,
			department,
		} = props.profile;

		setProfileId(id);
		setFirstName(firstName);
		setLastName(lastName);
		setEmail(email);
		setUsername(username);
		setPassword(password);
		setCollege(college);
		setDepartment(department);
		setInterest(interest);
		setDescription(description);
		setAge(age);
	}, [props.profile]);

	const handleUpdate = async () => {
		const user = {
			firstName,
			username,
			lastName,
			email,
			password,
			age,
			interest,
			description,
			college,
			department,
			createdBy: supabase.auth.user().id,
		};

		const response = await supabase
			.from("profiles")
			.update(user)
			.eq("id", props.profile.id)
			.single();

		if (response.error) {
			alert("Some Error Occurred when updating the user profile.");
			console.log(response.error);
		} else alert("Profile Successfully Updated");
		// fetchPosts();
	};

	return (
		<div
			className="modal fade"
			id="editProfileModal"
			tabIndex="-1"
			aria-labelledby="editProfileModal"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="signInModalLabel">
							Edit Profile
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<form>
							<div className="row mb-3">
								<div className="col">
									<input
										type="text"
										className="form-control"
										name="firstName"
										placeholder="First name"
										aria-label="First name"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
								<div className="col">
									<input
										type="text"
										className="form-control"
										name="lastName"
										placeholder="Last name"
										aria-label="Last name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
							</div>
							<div className="mb-3">
								<input
									type="text"
									name="username"
									className="form-control"
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="password"
									name="password"
									className="form-control"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div class="input-group mb-3">
								<span class="input-group-text" id="basic-addon1">
									@
								</span>
								<input
									type="email"
									name="email"
									class="form-control"
									placeholder="Email"
									aria-label="Email"
									aria-describedby="Email-Address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="number"
									name="age"
									className="form-control"
									placeholder="Age"
									value={age}
									onChange={(e) => setAge(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="text"
									name="college"
									className="form-control"
									placeholder="College"
									value={college}
									onChange={(e) => setCollege(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="text"
									name="department"
									className="form-control"
									placeholder="Department"
									value={department}
									onChange={(e) => setDepartment(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="text"
									name="interest"
									className="form-control"
									placeholder="Interest"
									value={interest}
									onChange={(e) => setInterest(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<textarea
									name="description"
									className="form-control"
									placeholder="Description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								handleUpdate();
							}}
							className="btn btn-primary"
							data-bs-dismiss="modal"
						>
							Update Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfileModal;
