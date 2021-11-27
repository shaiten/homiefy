import { supabase } from "../config/supabase";

const getAllRentItems = (observer) => {
	supabase
		.from("rents")
		.select()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

const insertRentItem = (item, observer) => {
	supabase
		.from("rents")
		.insert(item)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

const rentItem = (itemId, rentedUserId, observer) => {
	supabase
		.from("rents")
		.update({ rentedUserId })
		.eq("id", itemId)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

const deleteRentItem = (itemId, observer) => {
	supabase
		.from("rents")
		.delete()
		.eq("id", itemId)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

export { getAllRentItems, insertRentItem, rentItem, deleteRentItem };
