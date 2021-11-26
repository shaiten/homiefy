import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = (props) => {
	const { currentUser } = useAuth(); // determine if authorized, from context or however you're doing it
	let location = useLocation();

	console.log("====================================");
	console.log(props.match);
	console.log("====================================");

	if (!currentUser) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return props.children;
};

export default PrivateRoute;
