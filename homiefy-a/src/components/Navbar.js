import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";

import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

const Navbar = () => {
  const { currentUser, setcurruser } = useAuth();
  const history = useHistory();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    setcurruser();
    history.push("/");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Homiefy
          </Link>
          <div className="nav justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>

              {currentUser ? (
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignOut();
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#signInModal"
                    >
                      Sign In
                    </button>
                    <SignInModal />
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#signUpModal"
                    >
                      Sign Up
                    </button>
                    <SignUpModal />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
