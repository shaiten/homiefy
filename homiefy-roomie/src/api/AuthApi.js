import { supabase } from "../config/supabase";

const signUp = (user, observer) => {
	getUser(user.email, ({ error, data }) => {
		if (data) {
			return observer({ error: "User With This Email Already Exist!" });
		} else {
			supabase.auth
				.signUp({ email: user.email, password: user.password })
				.then(({ error, data }) => {
					if (error) {
						console.log(error);
						return observer({ error });
					} else {
						console.log("Sign Up successfull");
						return observer({ data });
					}
				})
				.catch((error) => {
					console.log("====================================");
					console.log(error);
					console.log("====================================");
					return observer({ error });
				});
		}
	});
};

const signIn = (user, observer) => {
	console.log("====================================");
	console.log(user);
	console.log("====================================");
	supabase.auth
		.signIn({ email: user.email, password: user.password })
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				getUser(user.email, observer);
			}
		});
};

const getUser = (email, observer) => {
	supabase
		.from("users")
		.select()
		.single()
		.eq("email", email)
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else return observer({ data });
		});
};

const insertUser = (user, observer) => {
	console.log("Inserting User");

	//delete the password from the user object
	//because we does not need to insert the password in the database
	delete user.password;

	//Insert the user data in users table in supabase
	supabase
		.from("users")
		.insert(user)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else return observer({ data: data });
		});
};

const updateUser = (user, observer) => {
	console.log("Updating User");

	//Update the user data in users table in supabase
	supabase
		.from("users")
		.update(user)
		.eq("id", user.id)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else return observer({ data: data });
		});
};

export { signUp, insertUser, updateUser, signIn };
