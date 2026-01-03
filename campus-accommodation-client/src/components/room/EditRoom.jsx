import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  Card,
  CardMedia,
  CircularProgress,
} from "@mui/material";

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { roomId } = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setIsLoading(true);
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(roomData.photo);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage("Error loading room data");
        setIsLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateRoom(roomId, room);
      if (response.status === 200) {
        setSuccessMessage("Room was updated successfully");
        const updatedRoomData = await getRoomById(roomId);
        setRoom(updatedRoomData);
        setImagePreview(updatedRoomData.photo);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

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

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Edit Room
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ width: "100%", mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert severity="error" sx={{ width: "100%", mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              id="roomType"
              name="roomType"
              label="Room Type"
              type="text"
              value={room.roomType}
              onChange={handleRoomInputChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              id="roomPrice"
              name="roomPrice"
              label="Room Price"
              type="number"
              value={room.roomPrice}
              onChange={handleRoomInputChange}
              required
              inputProps={{ min: 0, step: 0.01 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
              >
                Change Room Photo
                <input
                  type="file"
                  hidden
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreview && (
                <Card sx={{ mt: 2 }}>
                  <CardMedia
                    component="img"
                    image={
                      imagePreview.startsWith("data:")
                        ? imagePreview
                        : `data:image/jpeg;base64,${imagePreview}`
                    }
                    alt="Room preview"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: 400,
                      objectFit: "contain",
                    }}
                  />
                </Card>
              )}
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                component={RouterLink}
                to="/existing-rooms"
                variant="outlined"
                sx={{ flex: 1 }}
              >
                Back
              </Button>
              <Button type="submit" variant="contained" sx={{ flex: 1 }}>
                Update Room
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default EditRoom;
