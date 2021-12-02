import { supabase } from "../config/supabase";

test("Get posts", async () => {
  const status = await supabase
    .from("posts")
    .select()
    .then(({ data }) => {
      if (data) return 200;
    })
    .catch((error) => {
      return 400;
    });

  expect(status).toBe(200);
});


test("Insert post", async () => {
  const status = await supabase
    .from("posts")
    .insert({ name: "a name", address: "some address", description: "a description" })
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
