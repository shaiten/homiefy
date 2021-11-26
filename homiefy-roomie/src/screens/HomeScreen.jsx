import React, { Component, useEffect, useRef, useState } from "react";

import RoommateCard from "../components/RoommateCard";
import { useAuth } from "../contexts/AuthContext";

import _ from "lodash";
import { paginate } from "../utils/paginate";
import WebButton from "../components/WebButton";
import Hobbies from "../constants/Hobbies";
import Colors from "../constants/Colors";
import WebInput from "../components/WebInput";
import Header from "../components/Header";
import Paginate from "../components/Paginate";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const PAGE_SIZE = 20;

function HomeScreen(props) {
	const { users } = useAuth();
	const [currentPage, setCurrentPage] = useState(0);
	const [filteredUsers, setFilteredUsers] = useState(users);
	const [paginatedUsers, setPaginatedUsers] = useState(null);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [filters, setFilters] = useState();

	const age = useRef();
	const address = useRef();
	const country = useRef();
	const hobbie = useRef();
	const startingFrom = useRef();
	const endingAt = useRef();

	useEffect(() => {
		if (users) {
			getTotalPages(users);
			getPaginatedData(1, users);
			setFilteredUsers(users);
			setLoading(false);
		}
	}, [users]);

	const getTotalPages = (data) => {
		const pages = Math.ceil(data.length / PAGE_SIZE);
		setTotalPages(pages);
	};

	const getPaginatedData = (page, data = filteredUsers) => {
		const paginatedData = paginate(data, page, PAGE_SIZE);

		setPaginatedUsers(paginatedData);

		setCurrentPage(page);
	};

	const handleFilter = (e) => {
		const countryValue = country.current.value.trim();
		const hobbieValue = hobbie.current.value.trim();
		const addressValue = address.current.value.trim();
		const ageValue = age.current.value.trim();
		const startingFromValue = startingFrom.current.value.trim();
		const endingAtValue = endingAt.current.value.trim();

		if (
			countryValue == "" &&
			hobbieValue == "" &&
			addressValue == "" &&
			ageValue === "" &&
			startingFromValue === "" &&
			endingAtValue === ""
		) {
			getTotalPages(users);
			setFilteredUsers(users);
			getPaginatedData(1, users);
			return;
		}

		const filters = {};

		if (countryValue !== "") filters.country = [countryValue];
		if (ageValue !== "") filters.age = [ageValue];
		if (hobbieValue !== "") filters.hobbie = [hobbieValue];
		if (addressValue !== "") filters.address = [addressValue];

		let temp = filterCol(users)(filters);

		if (startingFromValue || endingAtValue)
			temp = temp.filter((i) => {
				if (
					startingFromValue !== "" &&
					endingAtValue === "" &&
					parseInt(i.budget) >= parseInt(startingFromValue)
				)
					return i;
				else if (
					startingFromValue === "" &&
					endingAtValue !== "" &&
					parseInt(i.budget) <= parseInt(endingAtValue)
				)
					return i;
				else if (
					startingFromValue !== "" &&
					endingAtValue !== "" &&
					parseInt(i.budget) >= parseInt(startingFromValue) &&
					parseInt(i.budget) <= parseInt(endingAtValue)
				)
					return i;
			});

		console.log("====================================");
		console.log(temp);
		console.log("====================================");

		getTotalPages(temp);
		setFilteredUsers(temp);
		getPaginatedData(1, temp);
	};

	const isValIncluded = (item) => (value, key) =>
		_.includes(value, _.get(item, key, null));
	const isValid = (filters) => (item) => _.every(filters, isValIncluded(item));
	const filterCol = (coll) => (filters) => _.filter(coll, isValid(filters));

	const handleClearFilter = () => {
		country.current.value = "";
		hobbie.current.value = "";
		address.current.value = "";
		age.current.value = "";

		getTotalPages(users);
		setFilteredUsers(users);
		getPaginatedData(1, users);
		return;
	};

	return (
		<>
			<Header title="Find Roommates" subTitle="For Free" image="/home3.png" />

			<div className="container">
				<div className="row">
					<Sidebar>
						<WebInput
							// label="Address"
							reference={address}
							placeholder={"Location"}
							style={{ margin: 0 }}
						/>
						<WebInput
							// label="Age"
							reference={age}
							placeholder={"Age"}
							style={{ margin: 0 }}
						/>
						<WebInput
							// label="Country"
							reference={country}
							dataList={_.uniq(_.map(users, "country"))}
							placeholder={"Country"}
							style={{ margin: 0 }}
						/>

						<WebInput
							// label="Hobbie"
							reference={hobbie}
							dataList={Hobbies}
							placeholder={"Hobbie"}
							style={{ margin: 0 }}
						/>
						<WebInput
							// label="Hobbie"
							reference={startingFrom}
							placeholder={"Budget Starting From"}
							style={{ margin: 0 }}
						/>
						<WebInput
							// label="Hobbie"
							reference={endingAt}
							placeholder={"Budget Ending At"}
							style={{ margin: 0 }}
						/>
						<div className="display-flex flex-row">
							<button
								label="Clear Filter"
								style={{ marginTop: 0 }}
								onClick={handleClearFilter}
								containerStyle={{ margin: 0 }}
								className="btn btn-primary"
							>
								Clear Filter
							</button>
							<button
								label="Search"
								style={{ margin: 0 }}
								onClick={handleFilter}
								containerStyle={{ margin: 0 }}
								className="btn btn-primary"
							>
								Search
							</button>
							{/* <WebButton
								label="Search"
								style={{ margin: 0 }}
								onClick={handleFilter}
								containerStyle={{ margin: 0 }}
								classes="btn btn-primary"
							/> */}
						</div>
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
									{paginatedUsers &&
										paginatedUsers?.map((item, index) => (
											<RoommateCard
												key={index}
												firstname={item.firstname}
												lastname={item.lastname}
												name={`${item.firstname} ${item.lastname} `}
												phone={item.phone}
												email={item.email}
												age={item?.age}
												image={item.image}
												address={item.address}
												id={item.id}
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

export default HomeScreen;
