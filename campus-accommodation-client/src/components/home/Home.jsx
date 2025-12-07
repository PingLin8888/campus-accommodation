import React from "react";
import MainHeader from "../layout/MainHeader";
import HotelService from "../common/HotelService";
import MuiFeaturedRooms from "../common/MuiFeaturedRooms";
import { useLocation } from "react-router-dom";
import { Box, Container, Alert } from "@mui/material";

const Home = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const currentUser = localStorage.getItem("userId");

  return (
    <Box>
      {message && (
        <Container sx={{ pt: 2 }}>
          <Alert severity="warning">{message}</Alert>
        </Container>
      )}
      {currentUser && (
        <Container sx={{ pt: 2 }}>
          <Alert severity="success">You are logged in as {currentUser}</Alert>
        </Container>
      )}
      <MainHeader />
      <MuiFeaturedRooms />
      <HotelService />
    </Box>
  );
};

export default Home;
