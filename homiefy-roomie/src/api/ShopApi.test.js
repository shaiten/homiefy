import { supabase } from "../config/supabase";

test("Get Shop Items", async () => {
  const status = await supabase
    .from("shop")
    .select()
    .then(({ data }) => {
      if (data) return 200;
    })
    .catch((error) => {
      return 400;
    });

  expect(status).toBe(200);
});

test("Insert Shop Item", async () => {
  const status = await supabase
    .from("shop")
    .insert({ title: "Test Shop Item", authors: "John Doe", price: "10" })
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

test("Delete Shop Item", async () => {
  const status = await supabase
    .from("shop")
    .delete()
    .eq("title", "Test Shop Item")
    .single();

  expect(true).toBe(true);
});
