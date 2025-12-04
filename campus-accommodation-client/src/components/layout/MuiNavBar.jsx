import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const MuiNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const { user, handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(!!token);
    setUserRole(role || "");
  };

  useEffect(() => {
    checkAuthStatus();
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ mt: 5, boxShadow: 1 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          Campus Accommodation
        </Typography>
        <Button color="inherit" component={NavLink} to="/browse-all-rooms">
          Browse all rooms
        </Button>
        {isLoggedIn && userRole === "ROLE_ADMIN" && (
          <Button color="inherit" component={NavLink} to="/admin">
            Admin
          </Button>
        )}
        <Button color="inherit" component={NavLink} to="/issues">
          Maintenance Issues
        </Button>
        <Button color="inherit" component={NavLink} to="/find-booking">
          Find Booking
        </Button>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isLoggedIn ? (
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleClose();
                  // Manually trigger a storage event to update the navbar instantly
                  window.dispatchEvent(new Event("storage"));
                }}
              >
                Logout
              </MenuItem>
            ) : (
              <MenuItem
                component={Link}
                to="/login"
                onClick={handleClose}
              >
                Login
              </MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MuiNavBar;
