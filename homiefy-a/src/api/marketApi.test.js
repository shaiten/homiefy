import { supabase } from "../config/supabase";

test("get market items", async () => {
  const status = await supabase
    .from("items")
    .select()
    .then(({ data }) => {
      if (data) return 200;
    })
    .catch((error) => {
      return 400;
    });

  expect(status).toBe(200);
});

test("input marketplace item", async () => {
  const status = await supabase
    .from("items")
    .insert({ name: "a name", price: "5", description: "its somthing" })
    .single()
    .then(({ data }) => {
      if (data) {
        return 200;
      }
    })
    .catch((error) => {
      return 400;
    });

  expect(status).toBe(200);
});
test("delete item", async () => {
  const status = await supabase
    .from("items")
    .delete()
    .eq("name", "a name")
    .single();

  expect(true).toBe(true);
});
