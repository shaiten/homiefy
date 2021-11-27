import _ from "lodash";
import React, { Component, createContext, useContext } from "react";
import { supabase } from "../config/supabase";

//Api
import * as ShopApi from "../api/ShopApi";

const ShopContext = createContext({});

class ShopProvider extends Component {
	state = {
		loading: false,
		shopItems: [], // this contain all the shop items available
	};

	componentDidMount() {
		ShopApi.getAllShopItems(({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				return;
			}
			this.setState({ shopItems: data });
		});
	}

	insertShopItem = (item, observer) => {
		this.setState({ loading: true });

		if (item.image) {
			const imageName = Date.now() + "." + _.last(item.image.name.split("."));
			supabase.storage
				.from("shop")
				.upload(`images/${imageName}`, item.image)
				.then((response) => {
					if (response.error) {
						observer({
							error: "Some Error Occurred When Uploading Image.",
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
		ShopApi.insertShopItem(item, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				this.setState({ loading: false });
				return observer({ error });
			}
			const temp = [...this.state.shopItems, data];
			this.setState({ loading: false, shopItems: temp });
			return observer({ data });
		});
	};

	handleShopItem = (item, buyerId, observer) => {
		// this.setState({ loading: true });
		ShopApi.shopItem(item.id, buyerId, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				return;
			} else {
				const temp = [...this.state.shopItems];
				const index = temp.indexOf(item);

				temp[index] = data;

				console.log("====================================");
				console.log(temp);
				console.log("====================================");

				alert("Item Successfully Bought");
				this.setState({ shopItems: temp });
			}
			// this.setState({ loading: false });
			observer();
		});
	};

	handleShopItemDelete = (item, observer) => {
		// this.setState({ loading: true });
		ShopApi.deleteShopItem(item.id, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				alert("Some Error Occurred When Deleting.");
				return;
			} else {
				let temp = [...this.state.shopItems];
				temp = temp.filter((i) => i.id !== item.id);

				this.setState({ shopItems: temp });
				alert("Item Successfully Deleted");
			}
			// this.setState({ loading: false });
			observer();
		});
	};

	render() {
		const value = {
			shopItems: this.state.shopItems,
			loading: this.state.loading,
			insertShopItem: this.insertShopItem,
			handleShopItem: this.handleShopItem,
			handleShopItemDelete: this.handleShopItemDelete,
		};

		return (
			<ShopContext.Provider value={value}>
				{this.props.children}
			</ShopContext.Provider>
		);
	}
}

export function useShop() {
	return useContext(ShopContext);
}

export default ShopProvider;
