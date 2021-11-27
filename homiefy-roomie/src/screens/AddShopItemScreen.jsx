import _ from "lodash";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";

import WebButton from "../components/WebButton";
import Format from "../constants/Format";

//Authentication context
import { useAuth } from "../contexts/AuthContext";

//SHop context
import { useShop } from "../contexts/ShopContext";

//Screen for adding shopable item
function AddShopItemScreen(props) {
	//Authentication Hook
	const { currentUser } = useAuth();
	const { loading, insertShopItem } = useShop();

	const navigate = useNavigate();

	const [message, setMessage] = useState();
	const [shopItemImage, setShopItemImage] = useState(null);
	// const [loading, setLoading] = useState(false);

	const title = useRef();
	const price = useRef();
	const edition = useRef();
	const isbn = useRef();
	const format = useRef();
	const authors = useRef();
	const publisher = useRef();
	const description = useRef();
	const image = useRef();

	const handleAddShopItem = (e) => {
		if (title.current.value === "" || price.current.value === "") {
			return setMessage("Please Enter All the Fields!");
		}

		setMessage("");

		const shopItem = {
			title: title.current.value,
			price: price.current.value,
			edition: edition.current.value,
			isbn: isbn.current.value,
			format: format.current.value,
			authors: authors.current.value,
			publisher: publisher.current.value,
			description: description.current.value,
			userId: currentUser.id,
			image: shopItemImage,
		};

		insertShopItem(shopItem, ({ error, data }) => {
			if (error) {
				console.log("====================================");
				console.log(error);
				console.log("====================================");
				return;
			}

			title.current.value = "";
			price.current.value = "";
			image.current.value = "";
			authors.current.value = "";
			format.current.value = "";
			isbn.current.value = "";
			edition.current.value = "";
			publisher.current.value = "";
			description.current.value = "";
		});
	};

	return (
		<section className="sign-in">
			<div className="container">
				<div className="signin-content">
					<div className="signin-image">
						<figure>
							<img
								src="https://cdn.dribbble.com/users/3286807/screenshots/13644798/media/6d4d1c8ad39ec5d45cda30feb2d29c51.jpg?compress=1&resize=1000x800"
								alt="Add Shop image"
							/>
						</figure>
					</div>

					<div className="signin-form">
						<h2 className="form-title">Add Item</h2>
						<form method="POST" className="register-form" id="shopItem-form">
							<div className="col-md-12">
								<div className="mb-3">
									<input
										className="form-control"
										type="file"
										id="formFile"
										ref={image}
										onChange={(event) =>
											setShopItemImage(event.target.files[0])
										}
									/>
								</div>
							</div>
							<div className="form-group">
								<label for="title">
									<i className="fa fa-header"></i>
								</label>
								<input
									type="text"
									name="title"
									id="title"
									placeholder="Title"
									ref={title}
								/>
							</div>
							<div className="row" style={{ marginBottom: 25 }}>
								<div className="col">
									<div className="form-group">
										<label for="price">
											<i className="fa fa-money"></i>
										</label>
										<input
											type="text"
											name="price"
											id="price"
											placeholder="Price"
											ref={price}
										/>
									</div>
								</div>
								<div className="col">
									<div className="form-group">
										<label for="price">
											<i className="fa fa-users"></i>
										</label>
										<input
											type="text"
											name="price"
											id="auther"
											placeholder="Authors"
											ref={authors}
										/>
									</div>
								</div>
							</div>
							<div className="row" style={{ marginBottom: 25 }}>
								<div className="col">
									<div className="form-group">
										<label for="edition">
											<i className="fa fa-book"></i>
										</label>
										<input
											type="text"
											name="edition"
											id="edition"
											placeholder="Edition"
											ref={edition}
										/>
									</div>
								</div>
								<div className="col">
									<div className="form-group">
										<label for="publisher">
											<i className="fa fa-shield"></i>
										</label>
										<input
											type="text"
											name="publisher"
											id="publisher"
											placeholder="Publisher"
											ref={publisher}
										/>
									</div>
								</div>
							</div>

							<div className="row" style={{ marginBottom: 25 }}>
								<div className="col">
									<div className="form-group">
										<label for="format">
											<i className="fa fa-file"></i>
										</label>
										<input
											type="text"
											name="format"
											id="format"
											placeholder="Format"
											ref={format}
											list="dataListFormat"
										/>
										<datalist id="dataListFormat">
											{Format.map((i, index) => (
												<option value={i} key={index} />
											))}
										</datalist>
									</div>
								</div>
								<div className="col">
									<div className="form-group">
										<label for="isbn">
											<i className="fa fa-barcode"></i>
										</label>
										<input
											type="text"
											name="isbn"
											id="isbn"
											placeholder="ISBN"
											ref={isbn}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<textarea
									className="form-control"
									style={{
										marginTop: 10,
										// border: 0,
										border: "1px solid #999",
									}}
									name="description"
									placeholder="Description"
									rows="4"
									ref={description}
								></textarea>
							</div>

							{message && (
								<div className="form-group text-danger">{message}</div>
							)}

							<WebButton
								label="Add Shop Item"
								onClick={handleAddShopItem}
								id="shopItem"
								loading={loading}
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AddShopItemScreen;
