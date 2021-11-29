import { supabase } from "../config/supabase";

test("Sign Up User", async () => {
  const status = await supabase.auth
    .signUp({ email: "johndoe@test.com", password: "123456" })
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

test("Sign In User with Valid Credentials", async () => {
  const status = await supabase.auth
    .signIn({ email: "johndoe@test.com", password: "123456" })
    .then(({ data }) => {
      if (data) {
        return 200;
      }
    })
    .catch((err) => {
      return 400;
    });

  expect(status).toBe(200);
});

test("Sign In User with Invalid Credentials", async () => {
  const status = await supabase.auth
    .signIn({ email: "johndoe@test.com", password: "1234567" })
    .then(({ data }) => {
      if (data) {
        return 200;
      }
    })
    .catch((err) => {
      return 400;
    });

  expect(status).not.toBe(200);
});

test("Insert User Details", async () => {
  await supabase.from("users").delete().match({ email: "johndoe@test.com" });

  const status = await supabase
    .from("users")
    .insert({
      email: "johndoe@test.com",
      firstname: "John",
      lastname: "Doe",
    })
    .single()
    .then(({ data }) => {
      if (data) return 200;
    })
    .catch((error) => {
      return 400;
    });

  expect(status).toBe(200);
});

test("Get User Details", async () => {
  const status = await supabase
    .from("users")
    .select()
    .single()
    .eq("email", "johndoe@test.com")
    .then(({ data }) => {
      if (data) return 200;
    })
    .catch((error) => {
      return 400;
    });

  expect(status).toBe(200);
});

test("Update User Details", async () => {
  const status = await supabase
    .from("users")
    .update({ id: "15", firstname: "Test", lastname: "1" })
    .eq("id", "15")
    .single()
    .then(({ data }) => {
      if (data) return 200;
    })
    .catch((error) => {
      return 400;
    });

  expect(status).toBe(200);
});
