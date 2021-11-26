import { supabase } from "../config/supabase";

const getAllShopItems = (observer) => {
	supabase
		.from("shop")
		.select()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

const insertShopItem = (item, observer) => {
	supabase
		.from("shop")
		.insert(item)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

const shopItem = (itemId, buyerId, observer) => {
	supabase
		.from("shop")
		.update({ buyerId })
		.eq("id", itemId)
		.single()
		.then(({ error, data }) => {
			if (error) return observer({ error });
			else {
				return observer({ data });
			}
		});
};

const deleteShopItem = (itemId, observer) => {
	supabase
		.from("shop")
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

export { getAllShopItems, insertShopItem, shopItem, deleteShopItem };
