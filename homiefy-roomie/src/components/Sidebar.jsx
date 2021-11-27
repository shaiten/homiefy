import React from "react";

//Constants
import Colors from "../constants/Colors";

const Sidebar = ({ children }) => {
	const grid = {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill, minmax(214px, 1fr))",
		gap: "10px",
	};

	return (
		<div className="col-md-3 mt-5 mb-5">
			<div
				style={{
					backgroundColor: Colors.white,
					padding: 20,
					borderRadius: 10,
				}}
			>
				<div style={grid}>{children}</div>
			</div>
		</div>
	);
};

export default Sidebar;
