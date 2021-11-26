import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../api/AuthApi";
import WebButton from "../components/WebButton";
import { useAuth } from "../contexts/AuthContext";

function LoginScreen(props) {
	//Authentication Hook
	const { setCurrentUser } = useAuth();

	const navigate = useNavigate();

	const [message, setMessage] = useState();
	const [loading, setLoading] = useState(false);

	const email = useRef();
	const password = useRef();

	const handleSignIn = (e) => {
		setLoading(true);
		setMessage("");

		if (email.current.value === "" || password.current.value === "") {
			setLoading(false);
			return setMessage("Please Enter All the Fields!");
		}

		const user = {
			email: email.current.value,
			password: password.current.value,
		};

		signIn(user, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				setMessage(error.message);
			} else {
				console.log("====================================");
				console.log(data);
				console.log("====================================");
				setCurrentUser(data);

				//Saving the user in session storage
				sessionStorage.setItem("user", JSON.stringify(data));

				// after login navigating the user to the homepage
				navigate("/home");
			}
			setLoading(false);
		});
	};

	return (
		<section className="sign-in">
			<div className="container">
				<div className="signin-content">
					<div className="signin-image">
						<figure>
							<img src="/signin-image.jpg" alt="sign up image" />
						</figure>
					</div>

					<div className="signin-form">
						<h2 className="form-title">Sign In</h2>
						<form method="POST" className="register-form" id="login-form">
							<div className="form-group">
								<label for="email">
									<i className="fa fa-envelope material-icons-name"></i>
								</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									ref={email}
								/>
							</div>
							<div className="form-group">
								<label for="your_pass">
									<i className="fa fa-lock"></i>
								</label>
								<input
									type="password"
									name="your_pass"
									id="your_pass"
									placeholder="Password"
									ref={password}
								/>
							</div>

							{message && (
								<div className="form-group text-danger">{message}</div>
							)}

							<WebButton
								label="Log In"
								onClick={handleSignIn}
								id="signin"
								loading={loading}
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default LoginScreen;
