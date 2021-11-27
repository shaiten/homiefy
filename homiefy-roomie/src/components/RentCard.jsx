import React, { useEffect, useState } from "react";

import Colors from "../constants/Colors";

import _ from "lodash";

import { useNavigate } from "react-router-dom";
import { insertUser } from "../api/AuthApi";

import NavLink from "./navbar/NavLink";
import WebButton from "./WebButton";
import { useAuth } from "../contexts/AuthContext";
import { useRent } from "../contexts/RentContext";

const WIDTH = 120;
const HEIGHT = 120;
const colors = ["#b8e986", "#84ecec", "#ff6984", "#46bbf1", "#ffe080"];

function RentCard(props) {
	const { user, item, onClick, showRentBtn = true } = props;
	const { index, id, price, title, userId, rentedUserId, image } = item;

	const [showShadow, setShowShadow] = useState(false);
	const [color] = useState(_.sample(colors));

	const navigate = useNavigate();

	return (
		<div
			className="roommateCard"
			style={{
				backgroundColor: Colors.white,
				borderRadius: 10,
				padding: 10,
				display: "flex",
				flexDirection: "column",
				borderBottom: `10px solid ${color}`,
				overflow: "hidden",
				whiteSpace: "nowrap",
				textOverflow: "ellipsis",
				width: "100%",
				boxShadow: showShadow ? "0 6px 20px 0 rgb(0 0 0 / 7%)" : "",
			}}
			onMouseOut={() => setShowShadow(false)}
			onMouseOver={() => setShowShadow(true)}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					cursor: "pointer",
				}}
				onClick={onClick}
			>
				<div
					style={{
						width: WIDTH,
						height: HEIGHT,
						borderRadius: WIDTH / 2,
						overflow: "hidden",
					}}
					className="mt-4"
				>
					<img
						src={
							image
								? image
								: "https://static.roommates.com/assets/fallback/avatar_default-be023e771899bdd2206080132c31af96050a634521eba8754ca358339890c4c5.png"
						}
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
					/>
				</div>
				<div style={{ marginTop: 10 }}>
					<h5>{title}</h5>
				</div>
				<div
					style={{
						display: "inline-block",
						marginTop: 14,
						color: "#3a3a3a",
						border: "1px solid #c6c6c6",
						boxSizing: "border-box",
						borderRadius: 40,
						fontSize: 12,
						padding: "3px 20px",
					}}
				>
					Renting Price - {price}$
				</div>

				<div style={{ marginTop: 10 }}>
					Posted By:{" "}
					<NavLink
						to={`/profile/${user?.id}`}
						label={`${user?.firstname} ${user?.lastname}`}
					/>
				</div>
			</div>
		</div>
	);
}

export default RentCard;
