import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function NavLink({ label, to, style, onClick }) {
	const location = useLocation().pathname.split("/")[1];

	const href = to.replace("/", "");

	return (
		<Link
			className={
				location === href ? "login btn btn-light action-button" : "login"
			}
			role="button"
			to={to}
			style={{ color: location === href ? "white" : "black", ...style }}
			// onClick={onClick}
		>
			{label}
		</Link>
	);
}

export default NavLink;
