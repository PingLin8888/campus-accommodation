import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import LogOut from "../auth/LogOut";
import Login from "../auth/Login";
import { useAuth } from "../auth/AuthProvider";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const { user, handleLogout } = useAuth(); // Updated to use user and handleLogout from AuthProvider

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(!!token); // Convert token to boolean and update isLoggedIn state
    setUserRole(role || "");
  };

  useEffect(() => {
    checkAuthStatus();

    // Listen for storage changes
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user]);

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
                Find Booking
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul className="dropdown-menu">
                {isLoggedIn ? (
                  <>
                    {/* <Link to={"/profile"} className="dropdown-item">
                      Profile
                    </Link>
                    <Link to={"/logout"} className="dropdown-item">
                      Logout
                    </Link> */}
                    {/* Pass State Up to Parent Component Ensure that the LogOut
                    component receives the setIsLoggedIn prop correctly to
                    update the state in the NavBar component. 
                    Ensure that the NavBar component is passing the necessary state and setState functions to child components properly.*/}
                    <LogOut setIsLoggedIn={setIsLoggedIn} />
                  </>
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
