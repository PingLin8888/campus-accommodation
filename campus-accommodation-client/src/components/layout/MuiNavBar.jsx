import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Box,
  Drawer,
  Divider,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../MUI/ColorModeIconDropdown.jsx";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

const MuiNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const { user, handleLogout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

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

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "text.primary",
                fontWeight: 600,
                mr: 2,
              }}
            >
              Campus Accommodation
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                component={NavLink}
                to="/browse-all-rooms"
              >
                Browse Rooms
              </Button>
              {isLoggedIn && userRole === "ROLE_ADMIN" && (
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  component={NavLink}
                  to="/admin"
                >
                  Admin
                </Button>
              )}
              <Button
                variant="text"
                color="info"
                size="small"
                component={NavLink}
                to="/issues"
              >
                Issues
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                component={NavLink}
                to="/find-booking"
                sx={{ minWidth: 0 }}
              >
                Find Booking
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {isLoggedIn ? (
              <>
                <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="account-menu"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="primary"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleClose();
                      window.dispatchEvent(new Event("storage"));
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component={Link}
                  to="/login"
                >
                  Sign in
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/register"
                >
                  Sign up
                </Button>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem
                  component={Link}
                  to="/browse-all-rooms"
                  onClick={toggleDrawer(false)}
                >
                  Browse Rooms
                </MenuItem>
                {isLoggedIn && userRole === "ROLE_ADMIN" && (
                  <MenuItem
                    component={Link}
                    to="/admin"
                    onClick={toggleDrawer(false)}
                  >
                    Admin
                  </MenuItem>
                )}
                <MenuItem
                  component={Link}
                  to="/issues"
                  onClick={toggleDrawer(false)}
                >
                  Issues
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/find-booking"
                  onClick={toggleDrawer(false)}
                >
                  Find Booking
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                {isLoggedIn ? (
                  <>
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={toggleDrawer(false)}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        toggleDrawer(false)();
                        window.dispatchEvent(new Event("storage"));
                      }}
                    >
                      Logout
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        component={Link}
                        to="/register"
                        onClick={toggleDrawer(false)}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        fullWidth
                        component={Link}
                        to="/login"
                        onClick={toggleDrawer(false)}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavBar;
