import React, { useState, useEffect, useContext } from "react";

//Supabase
import { supabase } from "../config/supabase";

//Lodash
import _ from "lodash";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		// const tempUser = sessionStorage.getItem("user");

		// console.log("====================================");
		// console.log("tempUser", tempUser);
		// console.log("====================================");

		// if (tempUser) {
		// 	const temp = JSON.parse(tempUser);
		// 	setCurrentUser(temp);
		// }
		// if (currentUser)
		// 	supabase
		// 		.from("users")
		// 		.select()
		// 		.neq("id", currentUser.id)
		// 		.then(({ error, data }) => {
		// 			if (error) {
		// 				console.log("====================================");
		// 				console.log(error);
		// 				console.log("====================================");
		// 			} else {
		// 				setUsers(data);
		// 			}
		// 		});
		// else
		supabase
			.from("users")
			.select()
			.then(({ error, data }) => {
				if (error) {
					console.log("====================================");
					console.log(error);
					console.log("====================================");
				} else {
					setUsers(data);
				}
			});
	}, []);

	const value = {
		currentUser,
		setCurrentUser,
		users: _.sortBy(users, ["createdAt"], "desc"),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
