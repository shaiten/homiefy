import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";

const SignInModal = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const { currentUser, setcurruser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      return setError("Please Enter All the Fields!");
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    supabase.auth
      .signIn({ email, password })
      .then((response) => {
        if (response.error) {
          return setError("Invalid email or password");
          console.log(response.error.message);
        } else {
          setcurruser(supabase.auth.user());
          console.log("Sign In successfull");
          console.log(response);
          history.push("/posts");
        }
      })
      .catch((err) => {
        console.log(err.response.text);
        return setError("Invalid Credentials!");
      });
  };

  const signinModal = (
    <div
      className="modal fade"
      id="signInModal"
      tabIndex="-1"
      aria-labelledby="signInModalLabel"
      data-bs-backdrop="false"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="signInModalLabel">
              Sign in to your account
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
                  ref={emailRef}
                  required={true}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  ref={passwordRef}
                  required={true}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {currentUser && currentUser.email}
              {currentUser
                ? console.log("curr user is ", currentUser.email)
                : console.log("no curr user")}
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
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
              className="btn btn-primary"
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
