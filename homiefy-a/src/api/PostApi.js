import { supabase } from "../config/supabase";

const getPosts = (observer) => {
	supabase
		.from("posts")
		.select()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

const createPost = (post, observer) => {
  	supabase
		.from("posts")
		.insert(post)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

export { getPosts, createPost};
