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
        <CardContent sx={{ flexGrow: 1, textAlign: "left" }}>
          <Typography 
            component="div" 
            variant="h5" 
            gutterBottom
            sx={{ fontWeight: 600, mb: 2, textAlign: "left" }}
          >
            {formatRoomType(room.roomType)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
            gutterBottom
            sx={{ textAlign: "left" }}
          >
            Room ID: {room.id}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", mt: 2, justifyContent: "flex-start" }}>
            <Typography
              variant="h4"
              component="div"
              color="primary"
              sx={{ fontWeight: 600, textAlign: "left" }}
            >
              €{room.roomPrice || 0}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              / night
            </Typography>
          </Box>
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
