import React from "react";
import { Link } from "react-router-dom";
import Colors from "../constants/Colors";

function AppLinkButton({
	label,
	style,
	location,
	disabled = false,
	btnType = "primary",
	href = "#",
	...otherProps
}) {
	if (otherProps.to)
		return (
			<Link
				style={{
					padding: 10,
					borderRadius: 6,
					textDecoration: "none",
					backgroundColor: disabled ? Colors.secondary : Colors.primary,
					border: 0,
					color: Colors.white,
					...style,
				}}
				{...otherProps}
			>
				{label}
			</Link>
		);
	else
		return (
			<a
				style={{
					padding: 10,
					borderRadius: 6,
					textDecoration: "none",
					backgroundColor: disabled ? Colors.secondary : Colors.primary,
					border: 0,
					color: Colors.white,
					...style,
				}}
				href={href}
				{...otherProps}
			>
				{label}
			</a>
		);
}

export default AppLinkButton;
