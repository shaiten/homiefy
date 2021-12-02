import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useHistory } from "react-router-dom";

const SignInModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSignIn = (email, password) => {
    supabase.auth
      .signIn({ email, password })
      .then((response) => {
        if (response.error) {
          console.log(response.error.message);
        } else {
          console.log("Sign In successfull");
          console.log(response);
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err.response.text);
      });
  };

  const signinModal = (
    <div
      className="modal fade"
      id="signInModal"
      tabIndex="-1"
      aria-labelledby="signInModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="signInModalLabel">
              Sign In Form
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSignIn(email, password);
              }}
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{signinModal}</div>;
};

export default SignInModal;
