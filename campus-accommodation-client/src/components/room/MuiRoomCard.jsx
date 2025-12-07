import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";

const MuiRoomCard = ({ room }) => {
  return (
    <Grid item xs={12} key={room.id}>
      <Card sx={{ display: "flex", my: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 250 }}
          image={`data:image/png;base64,${room.photo}`}
          alt="Room Photo"
        />
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Room Type: {room.roomType}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Room ID: {room.id}
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              component="div"
              sx={{ mt: 1 }}
            >
              Price: ${room.roomPrice} / night
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
            <Button
              variant="contained"
              component={Link}
              to={`/book-room/${room.id}`}
            >
              Book Now
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default MuiRoomCard;
