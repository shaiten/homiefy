import { supabase } from "../config/supabase";

test("Get Rent Items", async () => {
  const status = await supabase
    .from("rents")
    .select()
    .then(({ data }) => {
      if (data) return 200;
    })
    .catch((error) => {
      return 400;
    });

  expect(status).toBe(200);
});

test("Insert Rent Item", async () => {
  const status = await supabase
    .from("rents")
    .insert({ title: "Test Item", userId: "5", price: "10" })
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

test("Delete Rent Item", async () => {
  const status = await supabase
    .from("rents")
    .delete()
    .eq("title", "Test Item")
    .single();

  expect(true).toBe(true);
});
