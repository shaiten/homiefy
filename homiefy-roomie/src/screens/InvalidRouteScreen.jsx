import React, { Component } from "react";

export class InvalidRouteScreen extends Component {
	render() {
		return (
			<div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
				<div className="contentContainer">
					<h1>404 Not Found</h1>
				</div>
				<div className="sideBar" />
			</div>
		);
	}
}

export default InvalidRouteScreen;
