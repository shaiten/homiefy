import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../config/supabase";

import styles from "./styles.css";

import NavLink from "./NavLink";

const Navbar = () => {
	const { currentUser, setCurrentUser } = useAuth();

	const [show, setShow] = useState();
	const [showMenu, setShowMenu] = useState(false);

	const location = useLocation().pathname;
	const navigate = useNavigate();

	async function handleSignOut() {
		setCurrentUser();
		sessionStorage.clear();
		navigate("/home");
		const { error } = await supabase.auth.signOut();
	}

	return (
		<nav
			className="navbar navbar-light navbar-expand-lg navigation-clean-button"
			style={{ margin: 20 }}
		>
			<div className="container">
				<Link className="navbar-brand" to="/home">
					<h1 style={{ fontWeight: "bold", color: "rgb(46, 58, 89)" }}>
						ROOMIE
					</h1>
				</Link>
				<button className="navbar-toggler" onClick={() => setShow(!show)}>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					style={show ? { display: "block" } : { display: "none" }}
				>
					<ul className="navbar-nav me-auto justify-content-center align-items-center">
						<li className="navbar-text actions ms-3 me-3">
							<NavLink
								label="Roommates"
								to="/home"
								// style={{ marginLeft: 20 }}
							/>
						</li>
						<li className="navbar-text actions ms-3 me-3">
							<NavLink
								label="Rent"
								to="/rent"
								//  style={{ marginLeft: 20 }}
							/>
						</li>
						<li className="navbar-text actions ms-3 me-3">
							<NavLink
								label="Shop"
								to="/shop"
								//  style={{ marginLeft: 20 }}
							/>
						</li>
					</ul>
					<span className="navbar-text actions display-flex justify-content-center">
						{!currentUser ? (
							<ul className="navbar-nav justify-content-center align-items-center">
								<li className="navbar-text actions ms-3 me-3">
									<NavLink label="Log In" to="/login" />
								</li>
								<li className="navbar-text actions ms-3 me-3">
									<NavLink label="Sign Up" to="/register" />
								</li>
							</ul>
						) : (
							<div className="nav-item dropdown">
								<a
									href="#"
									data-toggle="dropdown"
									className="nav-item nav-link user-action"
									aria-expanded="false"
									onClick={() => setShowMenu(!showMenu)}
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<h6 className="dropdown-toggle">
										{`  ${currentUser.firstname} ${currentUser.lastname} `}
									</h6>
									<img
										src={
											currentUser.image
												? currentUser.image
												: "https://static.roommates.com/assets/fallback/avatar_default-be023e771899bdd2206080132c31af96050a634521eba8754ca358339890c4c5.png"
										}
										className="avatar"
										alt="Avatar"
										style={{ width: 40, height: 40, margin: 10 }}
									/>
								</a>
								<div className="dropdown-menu">
									<Link to="/profile" className="dropdown-item">
										<i className="fa fa-user-o me-1"></i> Profile
									</Link>
									<div className="divider dropdown-divider"></div>
									<a href="#" className="dropdown-item" onClick={handleSignOut}>
										<i className="fa fa-power-off me-1" /> Logout
									</a>
								</div>
							</div>
						)}
					</span>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
