import React, { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import {
  FaParking,
  FaTshirt,
  FaTv,
  FaUtensils,
  FaWifi,
  FaWineGlassAlt,
} from "react-icons/fa";
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";

const Checkout = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const { roomId } = useParams();

  useEffect(() => {
    let isMounted = true;

    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          if (isMounted) {
            setRoomInfo(response);
            setIsLoading(false);
            setError(null);
          }
        })
        .catch((error) => {
          if (isMounted) {
            setError(error.message || "Failed to load room information");
            setIsLoading(false);
          }
        });
    }, 1000);

    return () => {
      isMounted = false;
    };
  }, [roomId]);

  const roomServices = [
    { icon: <WifiIcon />, text: "WiFi" },
    { icon: <TvIcon />, text: "Netflix Premium" },
    { icon: <RestaurantIcon />, text: "Breakfast" },
    { icon: <LocalBarIcon />, text: "Mini bar refreshment" },
    { icon: <LocalParkingIcon />, text: "Parking Space" },
    { icon: <LocalLaundryServiceIcon />, text: "Laundry" },
  ];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Card sx={{ mb: 4 }}>
        <CardMedia
          component="img"
          image={`data:image/png;base64,${roomInfo.photo}`}
          alt="Room Photo"
          sx={{
            height: { xs: 250, md: 400 },
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {roomInfo.roomType
                  ? `${roomInfo.roomType
                      .charAt(0)
                      .toUpperCase()}${roomInfo.roomType
                      .slice(1)
                      .toLowerCase()} Room`
                  : "Room"}
              </Typography>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 600 }}>
                €{roomInfo.roomPrice} / night
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Room Services
              </Typography>
              <List>
                {roomServices.map((service, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
                      {service.icon}
                    </ListItemIcon>
                    <ListItemText primary={service.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <BookingForm />
    </Container>
  );
};

export default Checkout;
