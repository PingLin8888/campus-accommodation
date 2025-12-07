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

  const RoomCard = ({ room, label }) => (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {room.roomType}
        </Typography>
        <Typography variant="h6" color="primary">
          ${room.roomPrice} / night
        </Typography>
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
        <Typography
          variant="h5"
          component="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3 }}
        >
          Available Rooms
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {rooms.map((room) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={room.id}>
              <RoomCard room={room} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/browse-all-rooms"
          >
            Browse All Rooms
          </Button>
        </Box>
    </Box>
  );
};

export default MuiFeaturedRooms;

