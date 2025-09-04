import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
            </ul>
            <div className="d-flex">
              <Link className="btn btn-outline-light  mx-1" to="/login">
                Login
              </Link>

              <Link className="btn btn-outline-light  mx-1" to="/signup">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
