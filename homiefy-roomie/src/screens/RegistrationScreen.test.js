import React from "react";
import { render } from "@testing-library/react";

import { BrowserRouter as Router } from "react-router-dom";
import RegistrationScreen from "./RegistrationScreen";

test("Sign Up Screen Render", () => {
  const signUpForm = render(
    <Router>
      <RegistrationScreen />
    </Router>
  );

  expect(signUpForm).toBeDefined();
});