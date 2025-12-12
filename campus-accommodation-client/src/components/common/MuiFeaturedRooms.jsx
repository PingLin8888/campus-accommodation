import React, { useEffect, useState } from "react";
import {
  getAllRooms,
  getCheapestRoom,
  getMostDemandRoom,
} from "../utils/ApiFunctions";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";

const MuiFeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [cheapestRoom, setCheapestRoom] = useState(null);
  const [mostDemandRoom, setMostDemandRoom] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoomsData = async () => {
    try {
      setIsLoading(true);
      const [roomsData, cheapestRoomData, mostDemandRoomData] =
        await Promise.all([
          getAllRooms(),
          getCheapestRoom(),
          getMostDemandRoom(),
        ]);
      setRooms(roomsData.slice(0, 4)); // Show only first 4 rooms
      setCheapestRoom(cheapestRoomData);
      setMostDemandRoom(mostDemandRoomData);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomsData();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Error: {errorMessage}</Alert>
      </Container>
    );
  }

  const formatRoomType = (roomType) => {
    // Handle undefined, null, or empty string
    if (!roomType || typeof roomType !== "string" || roomType.trim() === "") {
      return "Room";
    }
    // Capitalize first letter, lowercase the rest
    const formatted = roomType.charAt(0).toUpperCase() + roomType.slice(1).toLowerCase();
    // Add "Room" if not already present
    return formatted.toLowerCase().includes("room") ? formatted : `${formatted} Room`;
  };

  const RoomCard = ({ room, label }) => (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: "1px solid",
        borderColor: "divider",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 12px 24px rgba(0,0,0,0.1)"
              : "0 12px 24px rgba(0,0,0,0.3)",
        },
      }}
    >
      {label && (
        <Chip
          label={label}
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1,
          }}
        />
      )}
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "cover" }}
        image={`data:image/png;base64,${room.photo}`}
        alt={`${room.roomType} Photo`}
      />
      <CardContent sx={{ flexGrow: 1, textAlign: "left" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 600, mb: 2, textAlign: "left" }}
        >
          {formatRoomType(room.roomType)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "flex-start" }}>
          <Typography variant="h4" component="div" color="primary" sx={{ fontWeight: 600, textAlign: "left" }}>
            €{room.roomPrice || 0}
          </Typography>
          <Typography variant="body2" component="span" color="text.secondary" sx={{ ml: 0.5 }}>
            / night
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to={`/book-room/${room.id}`}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box sx={{ py: { xs: 6, sm: 8 } }}>
      {/* Featured Rooms Section */}
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 4 }}
        >
          Featured Rooms
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6, justifyContent: "center" }}>
          {cheapestRoom && (
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <RoomCard room={cheapestRoom} label="Best Value" />
            </Grid>
          )}
          {mostDemandRoom && (
            <Grid size={{ xs: 12, sm: 6, md: 5 }}>
              <RoomCard room={mostDemandRoom} label="Most Popular" />
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Available Rooms Preview */}
      <Container>
        <Typography
          variant="h5"
          component="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3 }}
        >
          Available Rooms
        </Typography>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {rooms.map((room) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={room.id}>
              <RoomCard room={room} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MuiFeaturedRooms;
