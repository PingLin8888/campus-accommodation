import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const LogOut = ({ setIsLoggedIn }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    // make sure that the LogOut component correctly handles the logout process and updates local storage appropriately.
    setIsLoggedIn(false);
    navigate("/", { state: { message: "You have been logged out!" } });
  };

  return (
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
  );
};

export default LogOut;
