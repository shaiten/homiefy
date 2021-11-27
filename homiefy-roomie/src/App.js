import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import HomeScreen from "./screens/HomeScreen";
import InvalidRouteScreen from "./screens/InvalidRouteScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import AddRentItemScreen from "./screens/AddRentItemScreen";
import RentProvider from "./contexts/RentContext";
import RentsListingScreen from "./screens/RentsListingScreen";
import RentDetailScreen from "./screens/RentDetailScreen";
import AddShopItemScreen from "./screens/AddShopItemScreen";
import ShopListingScreen from "./screens/ShopListingScreen";
import ShopProvider from "./contexts/ShopContext";
import ShopDetailScreen from "./screens/ShopDetailScreen";
import CheckOutScreen from "./screens/CheckOutScreen";

function App() {
	return (
		<Router>
			<div className="App">
				<AuthProvider>
					<RentProvider>
						<ShopProvider>
							<Navbar />
							{/* <div className="container"> */}
							<Routes>
								<Route path="/" element={<HomeScreen />} />
								<Route path="/home" element={<HomeScreen />} />
								<Route path="/login" element={<LoginScreen />} />
								<Route path="/register" element={<RegistrationScreen />} />
								<Route
									path="/rent"
									exact={true}
									element={<RentsListingScreen />}
								/>
								<Route
									path="/rent/:id"
									exact={true}
									element={
										<PrivateRoute>
											<RentDetailScreen />
										</PrivateRoute>
									}
								/>

								<Route
									exact
									path="/rent/add"
									element={
										<PrivateRoute>
											<AddRentItemScreen />
										</PrivateRoute>
									}
								/>

								{/* Authentication */}
								<Route path="/login" element={<LoginScreen />} />
								<Route path="/register" element={<RegistrationScreen />} />

								{/* Profile Screen for user and roommates */}
								<Route
									exact
									path="/profile"
									element={
										<PrivateRoute>
											<ProfileScreen />
										</PrivateRoute>
									}
								/>
								<Route
									exact
									path="/profile/:id"
									element={
										<PrivateRoute>
											<UserDetailScreen />
										</PrivateRoute>
									}
								/>

								{/* shop routes */}

								<Route exact path="/shop" element={<ShopListingScreen />} />
								<Route
									exact
									path="/shop/add"
									element={
										<PrivateRoute>
											<AddShopItemScreen />
										</PrivateRoute>
									}
								/>
								<Route
									path="/shop/:id"
									exact={true}
									element={
										<PrivateRoute>
											<ShopDetailScreen />
										</PrivateRoute>
									}
								/>
								<Route
									path="/shop/checkout/:id"
									exact={true}
									element={
										<PrivateRoute>
											<CheckOutScreen />
										</PrivateRoute>
									}
								/>
								<Route path="*" exact={true} element={<InvalidRouteScreen />} />
							</Routes>
							{/* </div> */}
						</ShopProvider>
					</RentProvider>
				</AuthProvider>
			</div>
		</Router>
	);
}

export default App;
