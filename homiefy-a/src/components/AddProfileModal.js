import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AddProfileModal = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [college, setCollege] = useState("");
	const [department, setDepartment] = useState("");
	const [age, setAge] = useState("");
	const [interest, setInterest] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = async () => {
		const user = {
			firstName,
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
		const response = await supabase.from("profiles").insert(user).single();
		if (response.error) {
			alert("Some Error Occurred When Adding Profile.");
			console.log(response.error);
		}
		// fetchPosts();
		else alert("Profile successfully added.");
	};

	return (
		<div
			className="modal fade"
			id="addProfileModal"
			tabIndex="-1"
			aria-labelledby="addProfileModal"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="signInModalLabel">
							Add Profile
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
								handleSubmit();
							}}
							className="btn btn-primary"
							data-bs-dismiss="modal"
						>
							Save Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddProfileModal;
