import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const LogOut = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("handling log out");
    auth.handleLogout();
    // window.location.reload();
    navigate("/", { state: { message: "You have been logged out!" } });
  };

  const isLoggedIn = auth.user !== null;

  return isLoggedIn ? (
    <>
      <li>
        <Link className="dropdown-item" to={"/profile"}>
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <button className="dropdown-item" onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : null;
};

export default LogOut;
