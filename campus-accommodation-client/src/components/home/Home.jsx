import React, { useState, useEffect } from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import MuiFeaturedRooms from "../common/MuiFeaturedRooms";
import { useLocation } from "react-router-dom";
import { Box, Snackbar, Alert, styled } from "@mui/material";

const StyledAlert = styled(Alert)(({ theme, severity }) => ({
  backgroundColor: theme.palette.mode === "light" 
    ? theme.palette.background.paper 
    : theme.palette.grey[800],
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  "& .MuiAlert-icon": {
    color: severity === "success" 
      ? theme.palette.success.main 
      : theme.palette.warning.main,
  },
  "& .MuiAlert-message": {
    color: theme.palette.text.primary,
  },
}));

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const justLoggedIn = location.state && location.state.justLoggedIn;
  const currentUser = localStorage.getItem("userId");
  
  const [showLoginNotification, setShowLoginNotification] = useState(false);
  const [showMessageNotification, setShowMessageNotification] = useState(false);

  useEffect(() => {
    // Show login notification only when user just logged in (not on every page visit)
    if (justLoggedIn && currentUser) {
      setShowLoginNotification(true);
      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        setShowLoginNotification(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [justLoggedIn, currentUser]);

  useEffect(() => {
    // Show message notification if there's a message from navigation
    if (message) {
      setShowMessageNotification(true);
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setShowMessageNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Box>
      <Snackbar
        open={showLoginNotification}
        autoHideDuration={4000}
        onClose={() => setShowLoginNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 8 }}
      >
        <StyledAlert
          onClose={() => setShowLoginNotification(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          You are logged in as {currentUser}
        </StyledAlert>
      </Snackbar>

      <Snackbar
        open={showMessageNotification}
        autoHideDuration={5000}
        onClose={() => setShowMessageNotification(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 8 }}
      >
        <StyledAlert
          onClose={() => setShowMessageNotification(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {message}
        </StyledAlert>
      </Snackbar>

      <MainHeader />
      <Box
        component="section"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.background.default
              : theme.palette.background.paper,
        }}
      >
        <MuiFeaturedRooms />
      </Box>
      <HotelService />
    </Box>
  );
};

export default Home;
