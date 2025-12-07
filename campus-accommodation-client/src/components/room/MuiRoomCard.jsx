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
    <Grid size={{ xs: 12, md: 6 }} key={room.id}>
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%", boxShadow: 3, borderRadius: 2 }}>
        <CardMedia
          component="img"
          sx={{ 
            height: 240,
            width: "100%",
            objectFit: "cover"
          }}
          image={`data:image/png;base64,${room.photo}`}
          alt="Room Photo"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography component="div" variant="h5" gutterBottom>
            {room.roomType}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            gutterBottom
          >
            Room ID: {room.id}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            component="div"
            sx={{ mt: 2 }}
          >
            ${room.roomPrice} / night
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to={`/book-room/${room.id}`}
            fullWidth
          >
            Book Now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MuiRoomCard;
