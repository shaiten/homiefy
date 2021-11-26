import React, { Component, useEffect, useRef, useState } from "react";

import RoommateCard from "../components/RoommateCard";
import { useAuth } from "../contexts/AuthContext";

import _ from "lodash";
import { paginate } from "../utils/paginate";

//Header
import Header from "../components/Header";

//Button
import WebButton from "../components/WebButton";

//Input Components
import WebInput from "../components/WebInput";

//Constants
import Colors from "../constants/Colors";

import { useNavigate } from "react-router";

import RentCard from "../components/RentCard";
import Paginate from "../components/Paginate";
import Footer from "../components/Footer";
import { useShop } from "../contexts/ShopContext";
import Sidebar from "../components/Sidebar";

const PAGE_SIZE = 20;

function ShopListingScreen(props) {
	const { shopItems } = useShop();
	const { users, currentUser } = useAuth();
	const [currentPage, setCurrentPage] = useState(0);
	const [filteredItems, setFilteredItems] = useState(shopItems);
	const [paginatedItems, setPaginatedItems] = useState(null);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);

	// Using Navigate
	const navigate = useNavigate();

	useEffect(() => {
		getTotalPages(shopItems);
		getPaginatedData(1, shopItems);
		setFilteredItems(shopItems);
		setLoading(false);
	}, [shopItems]);

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
			getTotalPages(shopItems);
			setFilteredItems(shopItems);
			getPaginatedData(1, shopItems);
			return;
		}

		const temp = shopItems.filter((i) => i.title.toLowerCase().includes(value));

		getTotalPages(temp);
		setFilteredItems(temp);
		getPaginatedData(1, temp);
	};

	// const handleRentItem = (id) => {
	// 	rentItem(id, currentUser.id)
	// }

	const headerButtons = [
		<WebButton
			label="Add Item"
			style={{ margin: 0, width: "100%", alignSelf: "flex-end" }}
			onClick={() => navigate("/shop/add")}
			containerStyle={{ margin: 0 }}
		/>,
	];

	return (
		<>
			<Header
				title="Buying And Selling"
				subTitle="Items"
				buttons={headerButtons}
				image="/friends.png"
			/>
			<div className="container">
				<div className="row">
					<Sidebar>
						<WebInput
							// label="Address"
							placeholder={"Search"}
							style={{ margin: 0 }}
							onChange={handleSearch}
						/>
					</Sidebar>
					<div className="col-md-9 mt-5">
						{loading ? (
							<div className="display-flex justify-content-center align-items-center m-5 p-5">
								<div className="spinner-border ms-3" role="status" />
							</div>
						) : (
							<>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(auto-fill,minmax(225px,1fr))",
										gridGap: "1em",
									}}
								>
									{paginatedItems.length > 0 &&
										paginatedItems
											?.filter((i) => !i?.buyerId)
											.map((item, index) => (
												<RentCard
													key={index}
													item={item}
													user={_.filter(
														users,
														(i) =>
															i?.id?.toString() === item?.userId?.toString()
													).pop()}
													onClick={() => navigate(`/shop/${item.id}`)}
												/>
											))}
								</div>
								<Paginate
									onPrevPress={() => getPaginatedData(currentPage - 1)}
									onNextPress={() => getPaginatedData(currentPage + 1)}
									currentPage={currentPage}
									totalPages={totalPages}
								/>
							</>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default ShopListingScreen;
