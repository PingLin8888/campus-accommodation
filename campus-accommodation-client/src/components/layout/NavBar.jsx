import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import LogOut from "../auth/LogOut";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <span className="hotel-color">campus accommodation</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggle-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                aria-current="page"
                to={"/browse-all-rooms"}
              >
                Browse all rooms
              </NavLink>
            </li>

            {isLoggedIn && userRole === "ROLE_ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-booking"}>
                Find My Booking
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  showAccount ? "show" : ""
                }`}
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                role="button"
                onClick={handleAccountClick}
              >
                Account
              </a>

              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown"
              >
                {isLoggedIn ? (
                  <LogOut />
                ) : (
                  <li>
                    <Link to={"/login"} className="dropdown-item">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
