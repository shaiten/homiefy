import _ from "lodash";
import React, { Component, createContext, useContext } from "react";
import * as RentApi from "../api/RentApi";
import { supabase } from "../config/supabase";

const RentContext = createContext({});

class RentProvider extends Component {
	state = {
		loading: false,
		rentItems: [], // this contain all the rental items available
	};

	componentDidMount() {
		RentApi.getAllRentItems(({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				return;
			}
			this.setState({ rentItems: data });
		});
	}

	insertRentItem = (item, observer) => {
		this.setState({ loading: true });

		if (item.image) {
			const imageName = Date.now() + "." + _.last(item.image.name.split("."));
			supabase.storage
				.from("rents")
				.upload(`images/${imageName}`, item.image)
				.then((response) => {
					if (response.error) {
						observer({
							error: "Some Error Occurred When Uploadin Profile Image.",
						});
					} else {
						const result = supabase.storage
							.from(response.data.Key)
							.getPublicUrl();
						if (result.publicURL) {
							item.image = result.data.publicURL.replace(
								`${imageName}/undefined`,
								imageName
							);

							this.insertItem(item, observer);
						}
					}
				});
		} else {
			this.insertItem(item, observer);
		}
	};

	insertItem = (item, observer) => {
		RentApi.insertRentItem(item, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				this.setState({ loading: false });
				return observer({ error });
			}
			const temp = [...this.state.rentItems, data];
			this.setState({ loading: false, rentItems: temp });
			return observer({ data });
		});
	};

	handleRentItem = (item, rentedUserId, observer) => {
		// this.setState({ loading: true });
		RentApi.rentItem(item.id, rentedUserId, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				return;
			} else {
				const temp = [...this.state.rentItems];
				const index = temp.indexOf(item);

				temp[index] = data;

				console.log("====================================");
				console.log(temp);
				console.log("====================================");

				alert("Item Successfully Rented");
				this.setState({ rentItems: temp });
			}
			// this.setState({ loading: false });
			observer();
		});
	};

	handleRentItemDelete = (item, observer) => {
		// this.setState({ loading: true });
		RentApi.deleteRentItem(item.id, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				alert("Some Error Occurred When Deleting.");
				return;
			} else {
				let temp = [...this.state.rentItems];
				temp = temp.filter((i) => i.id !== item.id);

				this.setState({ rentItems: temp });
				alert("Item Successfully Deleted");
			}
			// this.setState({ loading: false });
			observer();
		});
	};

	render() {
		const value = {
			rentItems: this.state.rentItems,
			loading: this.state.loading,
			insertRentItem: this.insertRentItem,
			handleRentItem: this.handleRentItem,
			handleRentItemDelete: this.handleRentItemDelete,
		};

		return (
			<RentContext.Provider value={value}>
				{this.props.children}
			</RentContext.Provider>
		);
	}
}

export function useRent() {
	return useContext(RentContext);
}

export default RentProvider;
