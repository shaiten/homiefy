import React, { Component, useEffect, useRef, useState } from "react";

import RoommateCard from "../components/RoommateCard";
import { useAuth } from "../contexts/AuthContext";

import _ from "lodash";
import { paginate } from "../utils/paginate";
import WebButton from "../components/WebButton";
import Hobbies from "../constants/Hobbies";
import Colors from "../constants/Colors";
import { useRent } from "../contexts/RentContext";
import RentCard from "../components/RentCard";
import { useNavigate } from "react-router";

const PAGE_SIZE = 20;

function RentsListingScreen(props) {
	const { rentItems } = useRent();
	const { users, currentUser } = useAuth();
	const [currentPage, setCurrentPage] = useState(0);
	const [filteredItems, setFilteredItems] = useState(rentItems);
	const [paginatedItems, setPaginatedItems] = useState(null);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);

	// Using Navigate
	const navigate = useNavigate();

	useEffect(() => {
		if (rentItems) {
			getTotalPages(rentItems);
			getPaginatedData(1, rentItems);
			setFilteredItems(rentItems);
			setLoading(false);
		}
	}, [rentItems]);

	// Function to Get Total Pages
	const getTotalPages = (data) => {
		const pages = Math.ceil(data.length / PAGE_SIZE);
		setTotalPages(pages);
	};

	// Function to get paginated data
	const getPaginatedData = (page, data = filteredItems) => {
		const paginatedData = paginate(data, page, PAGE_SIZE);

		setPaginatedItems(paginatedData);

		setCurrentPage(page);
	};

	// Function for handling search
	const handleSearch = (e) => {
		const value = e.target.value.trim().toLowerCase();

		if (value === "") {
			getTotalPages(rentItems);
			setFilteredItems(rentItems);
			getPaginatedData(1, rentItems);
			return;
		}

		const temp = rentItems.filter((i) => i.title.toLowerCase().includes(value));

		getTotalPages(temp);
		setFilteredItems(temp);
		getPaginatedData(1, temp);
	};

	// const handleRentItem = (id) => {
	// 	rentItem(id, currentUser.id)
	// }

	return (
		<>
			<div className="container">
				<div
					style={{
						width: "100%",
						height: 100,
						backgroundColor: Colors.white,
						marginTop: 20,
						marginBottom: 20,
						borderRadius: 10,
						display: "grid",
					}}
				>
					<div className="row justify-content-center align-items-center">
						<div className="col-md-6">
							<div className="form-group">
								<input
									type="text"
									name="search"
									id="search"
									placeholder="Search"
									className="form-control"
									onChange={handleSearch}
								/>
							</div>
						</div>
						<div
							className="col-md-3"
							style={{
								justifyContent: "flex-end",
								alignItems: "center",
								display: "flex",
							}}
						>
							<WebButton
								label="Add Rent Item"
								style={{ marginTop: 0, padding: 15 }}
								onClick={() => navigate("/rent/add")}
							/>
						</div>
					</div>
				</div>
				{loading ? (
					<div className="display-flex justify-content-center align-items-center m-5 p-5">
						<div className="spinner-border ms-3" role="status" />
					</div>
				) : (
					<>
						<div
							style={{
								margin: 40,
								display: "grid",
								gridTemplateColumns: "repeat(auto-fill,minmax(225px,1fr))",
								gridGap: "1em",
							}}
						>
							{paginatedItems &&
								paginatedItems
									?.filter((i) => !i.rentedUserId)
									.map((item, index) => (
										<RentCard
											key={index}
											item={item}
											user={_.filter(
												users,
												(i) => i?.id?.toString() === item?.userId?.toString()
											).pop()}
										/>
									))}
						</div>
						<div className="row m-5 justify-content-between align-items-center align-self-end">
							<div className="col">
								<button
									className="btn btn-primary "
									disabled={currentPage <= 1}
									onClick={() => getPaginatedData(currentPage - 1)}
								>
									Prev
								</button>
							</div>
							<div className="col">
								<span>{`${currentPage} / ${totalPages}`}</span>
							</div>
							<div className="col">
								<button
									className="btn btn-primary"
									disabled={currentPage >= totalPages}
									onClick={() => getPaginatedData(currentPage + 1)}
								>
									Next
								</button>
							</div>
						</div>
					</>
				)}
			</div>
			<div
				style={{ backgroundColor: "black", width: "100%", height: 100 }}
			></div>
		</>
	);
}

export default RentsListingScreen;
