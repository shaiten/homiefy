import { supabase } from "../config/supabase";

const getMarketPosts = (observer) => {
	supabase
		.from("items")
		.select()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

const createMarketPost = (post, observer) => {
  	supabase
		.from("items")
		.insert(post)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

export { getMarketPosts, createMarketPost};
