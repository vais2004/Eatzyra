import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid ">
          <Link
            className="navbar-brand fs-1 text-light mb-1"
            style={{ fontFamily: "cursive" }}
            to="/">
            <i>Eatzyra</i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav  me-auto
            ms-3 ">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 link-light"
                  aria-current="page"
                  to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 link-light"
                    aria-current="page"
                    to="/">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn btn-light text-success mx-1" to="/login">
                  <b>Login</b>
                </Link>

                <Link className="btn btn-light text-success mx-1" to="/signup">
                  <b>Signup</b>
                </Link>
              </div>
            ) : (
              <div>
                <Link className="btn btn-light text-success mx-1">
                  <b>My Cart</b>
                </Link>

                <button
                  className="btn btn-light text-danger  mx-1"
                  onClick={handleLogout}>
                  <b>Logout</b>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
