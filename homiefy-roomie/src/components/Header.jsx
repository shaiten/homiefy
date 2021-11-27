import React from "react";

import Colors from "../constants/Colors";

const HEIGHT = 350;

export default function Header({ title, subTitle, image, buttons }) {
	return (
		<div style={{ backgroundColor: Colors.primary }}>
			<div className="row m-0">
				<div
					className="col-sm-6"
					style={{
						flexDirection: "column",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div>
						<h1
							style={{
								fontFamily: "Poppins",
								fontWeight: "bold",
								color: Colors.text,
							}}
						>
							{title}
						</h1>

						<h1
							style={{
								margin: 0,
								fontFamily: "Poppins",
								fontWeight: "bold",
								color: Colors.text,
							}}
						>
							{subTitle}
						</h1>
						<div className="display-flex flex-row-reverse ">
							{buttons && buttons.map((button) => button)}
						</div>
					</div>
				</div>
				<div className="col-sm-6">
					<img
						src={image}
						style={{ width: "100%", height: HEIGHT, objectFit: "contain" }}
					/>
				</div>
			</div>
		</div>
	);
}
