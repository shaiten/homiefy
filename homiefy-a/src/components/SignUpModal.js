import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";

const SignUpModal = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const history = useHistory();

  const { currentUser, setcurruser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      confirmPasswordRef.current.value === ""
    ) {
      return setError("Please Enter All the Fields!");
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords Do Not Match!");
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    supabase.auth
      .signUp({ email, password })
      .then((response) => {
        if (response.error) {
          return setError("Email already exists!");
        } else {
          setcurruser(supabase.auth.user());
          console.log("Sign Up successfull");
          console.log(response);
          history.push("/posts");
        }
      })
      .catch((err) => {
        return setError("Cannot create account!");
      });
    setLoading(false);
  }

  const signupModal = (
    // <div className="d-none">
    <div>
      <div
        className="modal fade"
        id="signUpModal"
        tabIndex="-1"
        aria-labelledby="signUpModalLabel"
        data-bs-backdrop="false"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signUpModalLabel">
                Create your account
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
                    type="text"
                    name="firstname"
                    className="form-control"
                    placeholder="First Name"
                    ref={firstNameRef}
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    placeholder="Last Name"
                    ref={lastNameRef}
                    required={true}
                  />
                </div>
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
                <div className="mb-3">
                  <input
                    type="password"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
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
                type="submit"
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleSignup();
                }}
                className="btn btn-primary"
                // data-bs-dismiss="modal"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{signupModal}</div>;
};

export default SignUpModal;
