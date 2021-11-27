import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";

import WebButton from "../components/WebButton";

//Authentication
import { insertUser, signUp } from "../api/AuthApi";

// Registration Screen or Page
function RegistrationScreen(props) {
	//state for storing any error or result message
	const [message, setMessage] = useState();

	//state for loading
	const [loading, setLoading] = useState(false);

	//Refrences for the form
	const firstname = useRef();
	const lastname = useRef();
	const email = useRef();
	const password = useRef();

	const navigate = useNavigate();

	//Function to handle signup
	function handleSignup(e) {
		setLoading(true);
		setMessage("");

		//prevent the default functionality
		e.preventDefault();

		// If these fields are none
		if (
			firstname.current.value === "" ||
			lastname.current.value === "" ||
			email.current.value === "" ||
			password.current.value === ""
		) {
			setLoading(false);
			return setMessage("Please Enter All the Fields!");
		}

		// if (password.current.value) {
		// 	return setMessage("Passwords Do Not Match!");
		// }

		const user = {
			email: email.current.value,
			password: password.current.value,
			firstname: firstname.current.value,
			lastname: lastname.current.value,
		};

		signUp(user, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				setLoading(false);
				return setMessage(error.toString());
			} else
				insertUser(user, (observer) => {
					if (observer.error) {
						console.log("====================================");
						console.log("insertUser: ", observer.error);
						console.log("====================================");
					} else {
						console.log("====================================");
						console.log("successfully inserted user");
						console.log("====================================");

						navigate("/login");
					}

					setLoading(false);
				});
		});
	}

	return (
		<section className="signup">
			<div className="container">
				<div className="signup-content">
					<div className="signup-form">
						<h2 className="form-title">Sign up</h2>

						<form className="register-form" id="register-form">
							<div className="row" style={{ marginBottom: 25 }}>
								<div className="col">
									<div className="form-group">
										<label for="firstname">
											<i className="fa fa-user material-icons-name"></i>
										</label>
										<input
											type="text"
											name="firstname"
											id="firstname"
											placeholder="First Name"
											ref={firstname}
										/>
									</div>
								</div>
								<div className="col">
									<div className="form-group">
										<label for="lastname">
											<i className="fa fa-user material-icons-name"></i>
										</label>
										<input
											type="text"
											name="lastname"
											id="lastname"
											placeholder="Last Name"
											ref={lastname}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label for="email">
									<i className="fa fa-envelope"></i>
								</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Your Email"
									ref={email}
								/>
							</div>
							<div className="form-group">
								<label for="pass">
									<i className="fa fa-lock"></i>
								</label>
								<input
									type="password"
									name="pass"
									id="pass"
									placeholder="Password"
									ref={password}
									required
								/>
							</div>

							{message && (
								<div className="form-group text-danger">{message}</div>
							)}

							<WebButton
								loading={loading}
								label={"Register"}
								id="signUp"
								onClick={handleSignup}
								type="submit"
							/>
						</form>
					</div>
					<div className="signup-image">
						<figure>
							<img src="/signup-image.jpg" alt="sing up image" />
						</figure>
					</div>
				</div>
			</div>
		</section>
	);
}

export default RegistrationScreen;
